'use strict'
// configurate the .env file when it is not in production
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index')

// route to see and read the blogs in more detail
router.get('/readmore/:id', controllers.readMoreController)

module.exports = router;