// configurate the .env file when it is not in production
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }
require('dotenv').config();

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../model/posts');


// TESTING
// render the file upload webpage
// router.get('/test', (req, res) => {
//     s3.getObject((err,data) => {
//         if(!err) {
//             console.log(data);
//         }
//     })
//     res.render('test.ejs');
// })

// endpoint to upload the image from the webpage
// router.post('/upload', upload.single('upload'), (req, res) => {
//     // upload(req, res, (err) => {
//     //     if (err) {
//     //         console.log(err);
//     //         return res.send(err);
//     //     }
//     //     console.log('File uploaded successfully.');
//     //     res.send('succesfully uploaded!');
//     //     res.end();
//     // });
//     res.send('uploadded!');
// })

// END TESTING



// route of the blog
router.get('/', (req, res) => {

    // find all posts from database and send back to the webpage
    Post.find({}, (err, posts) => {
        console.log(posts);
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