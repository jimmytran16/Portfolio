'use strict'

var nodemailer = require('nodemailer');
const configs = require('../config/main.config')

if (configs.NODE_ENV !== 'production') require('dotenv').config();

// function to send out the message that was submitted on the contact form
module.exports = function sendMessageController(req,res,next) {
   
   const name = req.body.name;
   const email = req.body.email;
   const message = req.body.message;

   var transporterInstance = nodemailer.createTransport({
      service: configs.SERVICE,
      auth: {
         user: configs.EMAIL_SENDER,
         pass: configs.EMAIL_SENDER_PASSW
      }
   });

   var mailingOptions = {
      from: configs.EMAIL_SENDER,
      to: configs.EMAIL_RECIEVER,
      subject: 'Portfolio - Contact',
      text: 'name: ' + name + '\nemail: ' + email + '\nmessage: ' + message
   };

   transporterInstance.sendMail(mailingOptions, function (err, info) {
      if (err) {
         return res.redirect('/?message=' + 'Service currently not available!' + '#location-container')
      } else {
         return res.redirect('/?message=' + 'Sucessfully Sent!' + '#location-container')
      }
   });
}