const express = require('express')
const indexRouter = require('./routes/home')
const reposRouter = require('./routes/repos')
const path = require('path');
const app = express();
const PORT = process.env.PORT||3000;

app.use('/',indexRouter); /* Path to the repos URL handler's main page */
app.set('view engine', 'ejs'); //config to use ejs template engine

app.get('/testapi',(req,res)=>{
    const url = process.env.ENDPOINT_URL;
    axios.get(url)
        .then(response => {
            console.log(typeof(response.data));
            //make a function to get a list of url links to the repos
            list_of_repos = getListOfRepos(response.data);            
            res.send(response.data, {'list_of_repos':list_of_repos});
        })
        .catch(error => {
            console.log(error);
        });
}); //test github api

app.use('/repos',reposRouter); /* Path to the repos URL handler's router */

//Static files 
app.use(express.static('public'))

// Listen to the port 
app.listen(PORT, ()=>{
    console.log("Connection to PORT "+PORT);
});

