'use strict'

const { proccessTags } = require('../utils/blogUtils');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// export environment variables 
module.exports = {
    PORT:process.env.PORT,
    SEC_KEY:process.env.SEC_KEY,
    ENDPOINT_URL:process.env.ENDPOINT_URL,
    URL_LOGIN:process.env.URL_LOGIN,
    URL_DASH:process.env.URL_DASH,
    URL_SUBMIT:process.env.URL_SUBMIT,
    URL_LOGOUT:process.env.URL_LOGOUT,
    BASE_ROUTER_ADMIN:process.env.BASE_ROUTER_ADMIN,
    BUCKET_NAME:process.env.BUCKET_NAME,
    EMAIL_RECIEVER:process.env.EMAIL_RECIEVER,
    EMAIL_SENDER:process.env.EMAIL_SENDER,
    EMAIL_SENDER_PASSW:process.env.EMAIL_SENDER_PASSW,
    SERVICE:process.env.SERVICE,
    NODE_ENV:process.env.NODE_ENV,
    DB_URL:process.env.DB_URL
}