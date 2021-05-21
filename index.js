'use strict'

const express = require('express')
const indexRouter = require('./src/routes/home')
const adminRouter = require('./src/routes/admin/admin')
const blogRouter = require('./src/routes/blog');
const projectRouter = require('./src/routes/projects')
const contactRouter = require('./src/routes/contact')
const error404Router = require('./src/routes/404')
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan')
const app = express();
const session = require('express-session');
var TIME_TO_CACHE = '0';

// If this is not a production server, then look for the local .env file
if (process.env.NODE_ENV !== 'production') {
        require('dotenv').config();
} else {
        TIME_TO_CACHE = '43200';
        //Set the app to detect HTTP and redirect to HTTPS traffic
        console.log("setting app to use SECURE CONNECTION");
        app.use((req, res, next) => {
                if (req.secure) { //if the request is secure than dont do anything
                        next();
                } else { //if the request is not secure, then redirect it to HTTPS
                        res.redirect('https://' + req.headers.host + req.url);
                }
        });
        app.enable('trust proxy');
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'))

//Set Static files && Views && EJS template engine
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'ejs');

// middle ware to cache the public contents on the user's browser
app.use(express.static('public', {
        maxAge: TIME_TO_CACHE // cached on client side for 12 hours before re-requesting the server
}));

app.use(session({
        secret: process.env.SEC_KEY,
        resave: true,
        saveUninitialized: true
}));

// connect to mongoose
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true }, (err) => { (err) ? console.log(err) : console.log('successfully connected to DB!') })

// routers
app.use('/', indexRouter); 
app.use('/blog', blogRouter);
app.use('/project',projectRouter);
app.use('/contact',contactRouter);
app.use(`/${process.env.BASE_ROUTER_ADMIN}`,adminRouter);
app.use('*', error404Router);


// export the app
module.exports = app;