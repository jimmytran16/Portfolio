const express = require('express')
const indexRouter = require('./routes/home')
const adminRouter = require('./routes/admin/admin')
const blogRouter = require('./routes/blog');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const Post = require('./model/posts');
const PORT = process.env.PORT || 3000; //Set PORT
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

//Set Static files && Views && EJS template engine
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'ejs');

// middle ware to cache the public contents on the user's browser
app.use(express.static('public', {
        maxAge: TIME_TO_CACHE // cached on client side for 12 hours before re-requesting the server
}));

// connect to mongoose
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true }, (err) => {
        if (err) { console.log(err); }
        else { console.log('successfully connected!'); }

        app.use('/', indexRouter); /* Path to the repos URL handler's main page */
        app.use('/blog', blogRouter);
        app.use(`/${process.env.BASE_ROUTER_ADMIN}`,adminRouter);
})

// Listen to the port
app.listen(PORT, () => {
        console.log(`Listening to PORT ${PORT} -- http://localhost:${PORT}`);
});