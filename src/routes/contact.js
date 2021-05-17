'use strict'

const express = require('express')
const router = express.Router()
const sendMessageController = require('../controllers/sendMessageController')

//  router to submit the contact form
//  call sendMessageController to send out email to myself
router.post('/send-message', (req,res) => {
    sendMessageController(req.body.name, req.body.email, req.body.message, (err, result) => {
        if (err) {
            console.log(err)
            return res.redirect('/?message=' + result + '#location-container')
        }else {
            return res.redirect('/?message=' + result + '#location-container')
        }
    })
})

module.exports = router;
