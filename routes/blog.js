const e = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../model/posts');

// configurate the .env file when it is not in production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// route of the blog
router.get('/', (req,res) => {  

    // find all posts from database and send back to the webpage
    Post.find({} , (err , posts) => {
        console.log(posts);
        if (err) {
            res.send(err);
        }else{
            res.render('blog/blog.ejs', {
                posts: posts
            })
        }
    })
})

// route for the user's log in
router.get(`/${process.env.URL_LOGIN}`, (req,res) => {
    res.render('admin/login.ejs');
})

router.get('/dashboard', (req,res) => {
    res.render('admin/dashboard.ejs');
})

// route to see and read the blogs in more detail
router.get('/readmore/:id', (req,res) => {
    let blog_id = req.params.id;

    // check if the string passed is a 12 byte string or 24 hex
    if (blog_id.length !== 24) {  res.sendStatus(404); return;}

    // look for the post in mongodb
    Post.findById({_id: new mongoose.Types.ObjectId(blog_id)}, (err , data) => {
        if ( err ) { 
            res.sendStatus(401);
            res.end();
        }
        else {
            // if there is no posts returned, then return a 404
            if (!data) { res.sendStatus(404); res.end(); return; }
            else {
                res.render('blog/readblog.ejs', {
                    posts:data
                })
            }
        }
    })
})

router.post('/submitpost', (req,res) => {
    console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;

    let post = new Post({
        title:title,
        description:description
    })

    post.save((err,result) => {
        if (err) {
            console.log(err);
            res.send(err);
            res.end();
        }
        else{
            res.redirect('dashboard');
        }
    })
})

module.exports = router;