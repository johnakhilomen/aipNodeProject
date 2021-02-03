const app = require('../src/app')
const knex = require('knex')
const { DATABASE_URL } = require('../src/config')

describe('App',()=>{

    it('GET/responds with 200 containing "Hello, world!',()=>{
        return supertest(app)
        .get('/')
        .expect(200, 'Hello, world!')
    })

})

describe('Test api endpoints', () => {

    before('make knex instance', () => {
        const db =knex({
            client: 'pg',
            connection:DATABASE_URL,
          })
          
          app.set('db',db)
      })

    context(`testing users endpoints`, () => {
      
        it(`/api/users should respond with 200 and a list of users`, () => {
        return supertest(app)
          .get('/api/users')
          .expect(200, 
            [
                { id: 1, username: 'jondoe3', fullname: 'Jon Doe' },
                { id: 2, username: 'jondoe4', fullname: 'Jon Doe' },
                { id: 3, username: 'jondoe5', fullname: 'Jon Doe' },
                { id: 4, username: 'jondoe6', fullname: 'Jon Doe' },
                { id: 5, username: 'jondoe7', fullname: 'Jon Doe' },
                { id: 6, username: 'davidg', fullname: 'david g' },
                { id: 8, username: 'johnA', fullname: 'johnA' },
                { id: 12, username: 'bobsmith', fullname: 'bob smith' },
                { id: 9, username: 'bobb', fullname: 'Bob B' },
                { id: 17, username: 'jondoe8', fullname: 'Jon Doe' },
                { id: 18, username: 'jondoe9', fullname: 'Jon Doe' },
                { id: 19, username: '', fullname: '' },
                { id: 21, username: 'test1', fullname: 'test1' },
                { id: 29, username: 'joeb', fullname: 'joe ben' },
                { id: 35, username: 'test', fullname: 'test' },
                { id: 37, username: 'davidb', fullname: 'David B' }
              ]
                
            )
      })

      it(`/api/users/1 should respond with 200 and jondoe3`, () => {
        return supertest(app)
          .get('/api/users/1')
          .expect(200, 
            {
                "id": 1,
                "username": "jondoe3",
                "fullname": "Jon Doe"
            },
            )
      })

      it(`/api/users/checkuser/jondoe3 authentication should respond with 200`, () => {
        return supertest(app)
          .post('/api/users/checkuser/jondoe3')
          .send({"password": "password"})
          .expect(200)
      })

      it(`/api/users/checkuser/jondoe3 anuthorized should respond with 401`, () => {
        return supertest(app)
          .post('/api/users/checkuser/jondoe3')
          .send({"password": "passwords"})
          .expect(401)
      })

      /*
      it(`/api/users/checkuser/jondoe3 anuthorized should respond with 401`, () => {
        return supertest(app)
          .put('/api/users/checkuser/jondoe3')
          .send({"password": "passwords"})
          .expect(201)
      })

      it(`/api/users/checkuser/jondoe3 anuthorized should respond with 401`, () => {
        return supertest(app)
          .delete('/api/users/checkuser/jondoe3')
          .expect(200)
      })*/

    })

})