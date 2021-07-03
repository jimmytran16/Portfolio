'use strict'

const mongoose = require('mongoose')
const Post = require('../model/posts')

// function to retrieve the specfic post that the user wanted to read from the database
module.exports = async function readMoreController(req,res,next) {
    var id = req.params.id

    if (id.length  !== 24) {
        res.status(400).json({
            message: 'Invalid post id ' + id,
            success:false,
            status: 400
        })
        return;
    }
    try {
        var posts = await Post.findById({ _id: new mongoose.Types.ObjectId(id) });
        res.render('entry/readblog.ejs', {
            posts: posts
        })
    }catch (err) {
        res.sendStatus(401);
        res.end();
    }

}