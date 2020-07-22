const express = require('express')
const indexRouter = require('./routes/home')
const reposRouter = require('./routes/repos')
const path = require('path');
const app = express();

// If this is not a production server
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config();
}else{
	 //Set the app to detect HTTP and redirect to HTTPS traffic
	console.log("setting app to use SECURE CONNECTION");
        app.use((req,res,next)=>{
                if(req.secure){ //if the request is secure than dont do anything
                        next();
                }else{ //if the request is not secure, then redirect it to HTTPS
                        res.redirect('https://'+req.headers.host + req.url);
                }
        });
	app.enable('trust proxy');
}
const PORT = process.env.PORT || 3000; //Set PORT

//Set Static files && Views && EJS template engine
app.use(express.static('public', {
  maxAge: '43200' // cached on client side for 12 hours before re-requesting the server
}));

app.set('views',path.join(__dirname,"views"))
app.set('view engine', 'ejs');

app.use('/',indexRouter); /* Path to the repos URL handler's main page */
app.use('/repos',reposRouter); /* Path to the repos URL handler's router */

// Listen to the port
app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT} -- http://localhost:${PORT}`);
});
