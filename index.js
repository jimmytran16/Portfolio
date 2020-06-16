const express = require('express')
const indexRouter = require('./routes/home')
const reposRouter = require('./routes/repos')
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


//Set Static files && Views && EJS template engine
app.use(express.static('public'))
app.set('views',path.join(__dirname,"views"))
app.set('view engine', 'ejs');

app.use('/',indexRouter); /* Path to the repos URL handler's main page */
app.use('/repos',reposRouter); /* Path to the repos URL handler's router */

// Listen to the port 
app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT} -- http://localhost:${PORT}`);
});

