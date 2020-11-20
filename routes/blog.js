// configurate the .env file when it is not in production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../model/posts');

// route of the blog
router.get('/', (req, res) => {

    // find all posts from database and send back to the webpage
    Post.find({}, (err, posts) => {
        if (err) {
            res.send(err);
        } else {
            res.render('blog/blog.ejs', {
                posts: posts.reverse(),
            })
        }
    })
})

// route to see and read the blogs in more detail
router.get('/readmore/:id', (req, res) => {
    let blog_id = req.params.id;

    // check if the string passed is a 12 byte string or 24 hex
    if (blog_id.length !== 24) { res.sendStatus(404); return; }

    // look for the post in mongodb
    Post.findById({ _id: new mongoose.Types.ObjectId(blog_id) }, (err, data) => {
        if (err) {
            res.sendStatus(401);
            res.end();
        }
        else {
            // if there is no posts returned, then return a 404
            if (!data) { res.sendStatus(404); res.end(); return; }
            else {
                res.render('blog/readblog.ejs', {
                    posts: data
                })
            }
        }
    })
})

module.exports = router;