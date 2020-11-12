if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

// URLS from env
const LOGIN_URL = process.env.URL_LOGIN;
const LOGOUT_URL = process.env.URL_LOGOUT;
const SUBMIT_URL = process.env.URL_SUBMIT;
const DASHBOARD_URL = process.env.URL_DASH;

// export the urls
module.exports = {
    LOGIN_URL:LOGIN_URL,
    LOGOUT_URL:LOGOUT_URL,
    SUBMIT_URL:SUBMIT_URL,
    DASHBOARD_URL:DASHBOARD_URL
}