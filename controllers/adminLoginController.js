// use .env file during development
if (process.env.NODE_ENV != 'production') require('dotenv').config();

// function to validate the admin and log them in
module.exports = function adminLoginController(username,password,callback) {
 
        if (username == process.env.ADMIN_USER && password == process.env.ADMIN_PASSW) {
            callback(null);
        }
        else {
            let message = 'error';
            callback(message)
        }
}