const Post = require('../model/posts')

// function to get the posts from the database
module.exports = function getAllBlogsController(callback) {
    Post.find({}, (err, posts) => {
        // console.log('from blog controller', posts)
        console.log(posts.length)
        if (err) {
            callback(err,null)
        } else {
            var orderedPosts = posts.reverse()
            callback(null,orderedPosts)
        }
    })
}