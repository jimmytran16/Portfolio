'use strict'

// use .env file during development
if (process.env.NODE_ENV != 'production') require('dotenv').config();

const configs = require('../config/config')

// function to validate the admin and log them in
module.exports = function adminLoginController(req, res, next) {

    // validate to see if the username and password is inside the request body
    if (!req.body.username || !req.body.password) {
        res.send('Username or password field not sent in!');
        res.end();
    }

    // get username and password from the request
    const username = req.body.username;
    const password = req.body.password;

    // if username and password is correct
    if (username == process.env.ADMIN_USER && password == process.env.ADMIN_PASSW) {
        req.session.user = req.body.username;
        req.session.admin = true;
        res.redirect(configs.DASHBOARD_URL);
    }
    else {
        let err = 'error';
        res.redirect(`${configs.LOGIN_URL}?msg=` + err);
    }
}