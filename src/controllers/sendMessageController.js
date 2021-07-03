'use strict'
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

var nodemailer = require('nodemailer');

// function to send out the message that was submitted on the contact form
module.exports = function sendMessageController(req,res,next) {
   
   const name = req.body.name;
   const email = req.body.email;
   const message = req.body.message;

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
         return res.redirect('/?message=' + 'Service currently not available!' + '#location-container')
      } else {
         return res.redirect('/?message=' + 'Sucessfully Sent!' + '#location-container')
      }
   });
}