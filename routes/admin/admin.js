// use .env file during development
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
// Load depencendies used for app
const express = require('express');
const router = express.Router();
const BlogUtil = require('../util/blogUtils');
const Post = require('../../model/posts');
const configs = require('./configs');

// Load dependencies for s3
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Declare variables used for s3 configs
const DO_ENDPOINT = process.env.s3_ENDPOINT;
const spacesEndpoint = new aws.Endpoint(DO_ENDPOINT);

// Declare an s3 instance and setting up it's configurations
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

// authentication middleware
var authenticateLoggedinUser = function (req, res, next) {
    if (req.session && req.session.user === "jimmytran16" && req.session.admin){
        console.log(req.session);
        return next();
    }
    else{
        return res.sendStatus(401);
    }
};

// middleware function to check if the user is logged in 
var checkIfUserisLoggedIn = function (req, res, next ) {
    if (req.session && req.session.user === process.env.ADMIN_USER && req.session.admin)
        return res.redirect(configs.DASHBOARD_URL)
    else
        return next();
}

/* ADMIN */

// route for the user's log in
router.get(`/${configs.LOGIN_URL}`, checkIfUserisLoggedIn, (req, res) => {
    console.log(req.session);
    if (req.query.msg) {
        if (req.query.msg == 'error') {
            return res.render('admin/login.ejs', { error: 'Invalid password or username' });
        } else {
            return res.render('admin/login.ejs', { error: null })
        }
    }
    return res.render('admin/login.ejs', { error: null })
})

// route for logging in
router.post(`/${configs.LOGIN_URL}`, (req, res) => {
    // validate to see if the username and password is inside the request body
    if (!req.body.username || !req.body.password) {
        res.send('Username or password field not sent in!');
        res.end();
    } else { // if it is sent, then validate the username and password -- store the info into the session if successfully authenticated
        if (req.body.username == process.env.ADMIN_USER && req.body.password == process.env.ADMIN_PASSW) {
            req.session.user = req.body.username;
            req.session.admin = true;
            res.redirect(configs.DASHBOARD_URL);
        }
        else {
            let message = 'error';
            res.redirect(`${configs.LOGIN_URL}?msg=` + message);
        }
    }
})

// route to go to dashboard of admin
router.get(`/${configs.DASHBOARD_URL}`, authenticateLoggedinUser, (req, res) => {
    let code_sample = 
    `
    <section class="code-class"> 
            <pre>
            
            </pre>
    </section>
    `;
    // set dashboard to have no cache, so user can't use back button to go back to content after they log out
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('admin/dashboard.ejs', {code:code_sample});
})

// route to logout
router.post(`/${configs.LOGOUT_URL}`, (req, res) => {
    req.session.destroy();
    res.redirect(configs.LOGIN_URL);
})

// route to submit the post
// pass in the upload middleware to upload the file that is being passed in
router.post(`/${configs.SUBMIT_URL}`, upload.single('upload'), (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;

    // validate to see if the file was uploaded
    if (!req.file.location) { res.send('error uploading file, no file was selected!'); res.end() }

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
            res.redirect(configs.DASHBOARD_URL);
        }
    })
})

module.exports = router;

