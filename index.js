const express = require('express')
const indexRouter = require('./routes/home')
const reposRouter = require('./routes/repos')
const path = require('path');
const app = express();

if(process.env.NODE_ENV !== 'production'){require('dotenv').config();} // If this is not a production server, then load the .env file
const PORT = process.env.PORT || 3000;

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
