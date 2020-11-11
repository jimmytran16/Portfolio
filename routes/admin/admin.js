// require the config of .env if it is not in production
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
// load dependancies
const express = require('express');
const router = express.Router();
const BlogUtil = require('../util/blogUtils');
const Post = require('../../model/posts');

// Load dependencies for s3
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// set s3 configs
const DO_ENDPOINT = process.env.s3_ENDPOINT;
const spacesEndpoint = new aws.Endpoint(DO_ENDPOINT);

// instance of s3 used to access sdk API  
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    apiVersion: '2006-03-01',
    secretAccessKey: process.env.aws_secret_access_key,
    accessKeyId: process.env.aws_access_key_id
});

// upload function for uploading the images to the s3 bucket
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (request, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
})

/* ADMIN */

// route for the user's log in
router.get(`/${process.env.URL_LOGIN}`, (req, res) => {
    res.render('admin/login.ejs');
})

// route to go to dashboard of admin
router.get(`/${process.env.URL_DASH}`, (req, res) => {
    res.render('admin/dashboard.ejs');
})

// route to submit the post
// pass in the upload middleware to upload the file that is being passed in
router.post(`/${process.env.URL_SUBMIT}`, upload.single('upload'), (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;

    // validate to see if the file was uploaded
    if(!req.file.location) { res.send('error uploading file, no file was selected!'); res.end() }

    // create a post object
    let post = new Post({
        title: title,
        description: description,
        minutes: BlogUtil.calculateReadTimePerPost(description),
        img_path: req.file.location
    })


    // save the post to the database
    post.save((err, result) => {
        if (err) {
            console.log(err);
            res.send(err);
            res.end();
        }
        else {
            res.redirect('dashboard');
        }
    })
})

module.exports = router;

