const express = require('express');
const router = express.Router();
const Post = require('../model/posts');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// route of the blog
router.get('/', (req,res) => {  
    res.render('main/blog.ejs');
})

// route for the user's log in
router.get(`/${process.env.URL_LOGIN}`, (req,res) => {
    res.render('admin/login.ejs');
})

router.get('/dashboard', (req,res) => {
    res.render('admin/dashboard.ejs');
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
            res.send(err);
            res.end();
        }
        else{
            res.redirect('dashboard');
        }
    })
})

module.exports = router;