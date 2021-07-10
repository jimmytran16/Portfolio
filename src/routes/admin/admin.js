'use strict'

// use .env file during development
if (process.env.NODE_ENV != 'production') require('dotenv').config();

// Load depencendies used for app
const express = require('express');
const router = express.Router();
const configs = require('../../config/admin.config')
const submitPostController = require('../../controllers/submitPostController')
const controllers = require('../../controllers/index')
const { authenticateLoggedinUser, checkIfUserisLoggedIn, uploader } = require('./middlewares')

/* ADMIN */

// route for the user's log in
router.get(`/${configs.LOGIN_URL}`, checkIfUserisLoggedIn, controllers.adminLoginPageController);
// route for logging in
router.post(`/${configs.LOGIN_URL}`, controllers.adminLoginController);
// route to go to dashboard of admin
router.get(`/${configs.DASHBOARD_URL}`, authenticateLoggedinUser, controllers.adminDashboardController);
// route to logout
router.post(`/${configs.LOGOUT_URL}`, controllers.adminLogoutController);
// route to submit and upload blog posts
router.post(`/${configs.SUBMIT_URL}`, uploader.single('upload'), controllers.submitPostController);

module.exports = router;

