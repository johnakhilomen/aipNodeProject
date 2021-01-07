const UsersService = {
    getAllUsers(knex){
        return knex
        .select('aip_users.id','aip_users.username','aip_users.fullname')
        .from('aip_users')
    },
    insertNewUser(knex, newUser){
        return knex
            .insert(newUser)
            .into('aip_users')
            .returning('*')
            .then(rows=>{
                return rows[0]
            })
    },
    getUserByUserId(knex, id){
        return knex 
            .from('aip_users')
            .select('*')
            .where('id',id)
            .first()
    },
    getUserByUsername(knex, username){
        return knex 
            .select('id','username','password')
            .from('aip_users')
            .where('username',username)
            .first()
    },
    deleteUser(knex, id){
        return knex
            .from('aip_users')
            .where({id})
            .delete()
    }
}

module.exports = UsersService;