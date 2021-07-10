'use strict'

// imports
// use .env file during development
if (process.env.NODE_ENV != 'production') require('dotenv').config();

const configs = require('../../config/admin.config')
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Declare variables used for s3 configs
const DO_ENDPOINT = configs.s3_ENDPOINT;
const spacesEndpoint = new aws.Endpoint(DO_ENDPOINT);

// Declare an s3 instance and setting up it's configurations
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    apiVersion: '2006-03-01',
    secretAccessKey: configs.aws_secret_access_key,
    accessKeyId: configs.aws_access_key_id
});

// admin middle ware functions

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
    },
});

// authentication middleware
const authenticateLoggedinUser = function (req, res, next) {
    if (req.session && req.session.user === configs.ADMIN_USER && req.session.admin){
        console.log(req.session);
        return next();
    }
    else{
        return res.sendStatus(401);
    }
};

// middleware function to check if the user is logged in 
const checkIfUserisLoggedIn = function (req, res, next ) {
    if (req.session && req.session.user === configs.ADMIN_USER && req.session.admin)
        return res.redirect(configs.DASHBOARD_URL)
    else
        return next();
}


// export the functions
module.exports = {
    checkIfUserisLoggedIn:checkIfUserisLoggedIn,
    authenticateLoggedinUser:authenticateLoggedinUser,
    uploader:uploader
}