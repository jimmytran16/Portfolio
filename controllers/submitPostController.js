const BlogUtil = require('../utils/blogUtils')
const Post = require('../model/posts')

// function for the admin to submit a post
module.exports = function submitPost(title,description,tags,custom_tags,file_location,callback) {
    // validate if the tag is passed in
    if (!tags) {
        tags = [];
    }
    
    // create a post object
    let post = new Post({
        title: title,
        description: description,
        minutes: BlogUtil.calculateReadTimePerPost(description),
        img_path: file_location,
        tags: BlogUtil.proccessTags(( Array.isArray(tags) ? tags : Array(tags) ), ( custom_tags === '' ? null : custom_tags.split(',') ) ) 
    })

    // save the post to the database
    post.save((err, result) => {
        if (err) {
            return callback(err)
        }
        else {
            return callback(null)
        }
    })

}