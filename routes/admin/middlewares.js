// imports
// use .env file during development
if (process.env.NODE_ENV != 'production') require('dotenv').config();
const configs = require('./configs')


// admin middle ware functions
// authentication middleware
var authenticateLoggedinUser = function (req, res, next) {
    if (req.session && req.session.user === process.env.ADMIN_USER && req.session.admin){
        console.log(req.session);
        return next();
    }
    else{
        return res.sendStatus(401);
    }
};

// middleware function to check if the user is logged in 
var checkIfUserisLoggedIn = function (req, res, next ) {
    if (req.session && req.session.user === process.env.ADMIN_USER && req.session.admin)
        return res.redirect(configs.DASHBOARD_URL)
    else
        return next();
}

// export the functions
module.exports = {
    checkIfUserisLoggedIn:checkIfUserisLoggedIn,
    authenticateLoggedinUser:authenticateLoggedinUser
}