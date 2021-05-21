'use strict'
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

var nodemailer = require('nodemailer');

// function to send out the message that was submitted on the contact form
module.exports = function sendMessageController(name, email, message, callback) {
   var transporterInstance = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
         user: process.env.EMAIL_SENDER,
         pass: process.env.EMAIL_SENDER_PASSW
      }
   });

   var mailingOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_RECIEVER,
      subject: 'Portfolio - Contact',
      text: 'name: ' + name + '\nemail: ' + email + '\nmessage: ' + message
   };

   transporterInstance.sendMail(mailingOptions, function (err, info) {
      if (err) {
         console.log(err)
         return callback(null, 'Service currently not available!');
      } else {
         console.log('Email sent: ' + info.response);
         return callback(null, 'Sucessfully Sent!')
      }
   });
}