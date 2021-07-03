'use strict'

const express = require('express')
const router = express.Router()
const controllers = require('../controllers/index')

//  router to submit the contact form
//  call sendMessageController to send out email to myself
router.post('/send-message', controllers.sendMessageController);

module.exports = router;
