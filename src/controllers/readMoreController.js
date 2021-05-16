'use strict'

const mongoose = require('mongoose')
const Post = require('../model/posts')

// function to retrieve the specfic post that the user wanted to read from the database
module.exports = function readMoreController(blog_id,callback) {
    Post.findById({ _id: new mongoose.Types.ObjectId(blog_id) }, (err, data) => {
        if (err || !data) {
            return callback(err,null);
        }
        else {
            return callback(null,data);
        }
    })
}