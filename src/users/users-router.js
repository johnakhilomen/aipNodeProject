const express = require('express')
const xss = require('xss')
const path = require('path')
const UsersService = require('./users-service')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {jwtSecret} = require("../config");

var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, jwtSecret);



const usersRouter = express.Router()
const jsonParser = express.json()

const serializedUser = user =>({
    id:user.id,
    username:xss(user.username),
    fullname:xss(user.fullname),
})

usersRouter
  .route('/')
  .get((req, res,next)=>{

    UsersService.getAllUsers(
      req.app.get('db')
    )
    .then(users=>{
       res.json(users.map(serializedUser))
    })
    .catch(next)
    })
    .post(jsonParser, (req, res, next)=>{
       const { fullname, username, password } = req.body
  
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            
            const password = hash;
            const newUser = { fullname, username, password }

            for(const [key, value] of Object.entries(newUser)){
              if(value==null){
                return res.status(400).json({
                  error: {message: `Missing '${key}' in request body`}
                 })
                }
            }

            UsersService.insertNewUser(
              req.app.get('db'),
              newUser
             )
            .then(user=>{
              res
                .status(201)
                .location(path.posix.join(req.originalUrl + `/${user.id}`))
                .json(serializedUser(user))
             })
             .catch(next)

          });
      });

       
    })

usersRouter
    .route(`/:user_id`)
    .all((req, res, next)=>{
        UsersService.getUserByUserId(
          req.app.get('db'),
          req.params.user_id
        )
        .then(user=>{
          if(!user){
             return res.status(404).json({
             error: {message: `User doesn't exist` }
              })
            }
            res.user = user
            next()
        })
        .catch(next)       
    })
    .get((req, res, next)=>{
        res.json(serializedUser(res.user))
    })
    .delete((req, res, next)=>{
        UsersService.deleteUser(
            req.app.get('db'),
            req.params.user_id
        )
        .then(()=>{
            res.status(204).end()
        })
        .catch(next)
    })


    usersRouter
    .route(`/checkuser/:username`)
    .all((req, res, next)=>{
        UsersService.getUserByUsername(
          req.app.get('db'),
          req.params.username
        )
        .then(user=>{
          if(!user){
             return res.status(404).json({
             error: {message: `User doesn't exist` }
              })
            }
            res.user = user
            next()
        })
        .catch(next)       
    })

    .post(jsonParser, (req, res, next)=>{
      const { password } = req.body
      bcrypt.compare(password, res.user.password, function(error, response) {
        if(!response){
          res.status(401).json({success: false});
        } 
        else
        {
          res.status(200).json({"token": token});
        }
       
      }); 
      /*if(username == res.user.username && password == res.user.password)
      {
        res.json({"userId": res.user.id})
      }
      else{
        res.json({"success": false})
      }*/
      
    })
   


module.exports = usersRouter 