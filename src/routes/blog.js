'use strict'
// configurate the .env file when it is not in production
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const router = express.Router();
const getAllBlogsController = require('../controllers/getAllBlogsController')
const readMoreController = require('../controllers/readMoreController')

// route of the blog
router.get('/', (req, res) => {

    getAllBlogsController((err,posts) => {
        if (err) {
            res.send(err)
        }else {
            res.render('blog/blog.ejs', {
                posts: posts,
            })
        }
    })

})

// route to see and read the blogs in more detail
router.get('/readmore/:id', (req, res) => {
    let blog_id = req.params.id;

    // check if the string passed is a 12 byte string or 24 hex
    if (blog_id.length !== 24) { res.sendStatus(404); return; }

    // call the readMore controller
    readMoreController(blog_id, (err,data) => {
        if (err) {
            res.sendStatus(401);
            res.end();
        }else {
            res.render('blog/readblog.ejs', {
                posts: data
            })
        }
    })

})

module.exports = router;