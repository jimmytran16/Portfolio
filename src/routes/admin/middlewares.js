// imports
// use .env file during development
if (process.env.NODE_ENV != 'production') require('dotenv').config();
const configs = require('./configs')
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

// admin middle ware functions


// middleware function for uploading the images to the s3 bucket
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
const authenticateLoggedinUser = function (req, res, next) {
    if (req.session && req.session.user === process.env.ADMIN_USER && req.session.admin){
        console.log(req.session);
        return next();
    }
    else{
        return res.sendStatus(401);
    }
};

// middleware function to check if the user is logged in 
const checkIfUserisLoggedIn = function (req, res, next ) {
    if (req.session && req.session.user === process.env.ADMIN_USER && req.session.admin)
        return res.redirect(configs.DASHBOARD_URL)
    else
        return next();
}


// export the functions
module.exports = {
    checkIfUserisLoggedIn:checkIfUserisLoggedIn,
    authenticateLoggedinUser:authenticateLoggedinUser,
    upload:upload
}