'use strict'

const Post = require('../model/posts')
const projectData = require('../utils/projectsData')

// function to get the posts from the database
module.exports = async function getAllBlogsController(req,res,next) {

    let data = projectData.indexPage
    let blogs = []
    let message = req.query.message
    let success = message === 'Sucessfully Sent!'
    
    try {
        var posts = await Post.find({})
        res.render('entry/index' , { data: data, blogs: posts, message: message, success: success })
    }catch(err) {
        res.send(err)
    }
}