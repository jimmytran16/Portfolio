'use strict'

// use .env file during development
if (process.env.NODE_ENV != 'production') require('dotenv').config();

// Load depencendies used for app
const express = require('express');
const router = express.Router();
const configs = require('./configs');
const submitPostController = require('../../controllers/submitPostController')
const adminLoginController = require('../../controllers/adminLoginController')
const { authenticateLoggedinUser, checkIfUserisLoggedIn, upload } = require('./middlewares')

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
        adminLoginController(req.body.username, req.body.password, (err) => {
            if (err) {
                res.redirect(`${configs.LOGIN_URL}?msg=` + err);
            } else {
                req.session.user = req.body.username;
                req.session.admin = true;
                res.redirect(configs.DASHBOARD_URL);
            }
        })

    }
})

// route to go to dashboard of admin
router.get(`/${configs.DASHBOARD_URL}`, authenticateLoggedinUser, (req, res) => {
    let code_sample = configs.CODE_SAMPLE;
    // set dashboard to have no cache, so user can't use back button to go back to content after they log out
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('admin/dashboard.ejs', { code: code_sample });
})

// route to logout
router.post(`/${configs.LOGOUT_URL}`, (req, res) => {
    req.session.destroy();
    res.redirect(configs.LOGIN_URL);
})

const multer = require('multer')

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
    },
});

router.post(`/${configs.SUBMIT_URL}`, uploader.single('upload'), (req, res, next) => {

    try {

        if (!req.file) {
            res.status(400).send('Error, could not upload file');
            return;
        }

        submitPostController(req, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
                res.end();
            } else {
                res.redirect(configs.DASHBOARD_URL);
            }
        })

    } catch (error) {
        res.status(400).send(`Error, could not upload file: ${error}`);
        return;
    }

})

module.exports = router;

