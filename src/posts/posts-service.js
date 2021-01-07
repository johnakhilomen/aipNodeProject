const PostsService = {
  getAllPosts(knex){
    return knex
    .select('*')
    .from('aip_posts')
  },

  getPostsByUserId(knex, userId){
     console.log(userId)
     return knex
     .select('*')
     .from('aip_posts')
     .where('user_id',userId)
   },
  insertNewPost(knex, newPost){
      return knex
      .insert(newPost)
      .into('aip_posts')
      .returning('*')
      .then(rows=>{
       return rows[0]
    })
   },
    getPostByPostId(knex, id){
      return knex 
        .from('aip_posts')
        .select('*')
        .where('id',id)
        .first()
    },
    deletePost(knex, id){
        return knex
          .from('aip_posts')
          .where({id})
          .delete()
    }
}

module.exports = PostsService; 