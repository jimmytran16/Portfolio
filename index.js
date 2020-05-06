const express = require('express')
const indexRouter = require('./routes/home')
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT||3000;

app.use('/',indexRouter); //route to main page
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

app.get('/repos',(req,res)=>{
    const url = process.env.ENDPOINT_URL; //get the url endpoint from the enviroment 
    axios.get(url)
        .then(response => {
            console.log(typeof(response.data));
            //make a function to get a list of url links to the repos
            list_of_repos = getListOfRepos(response.data);            
            res.render(__dirname+'/views/index', {'repos':list_of_repos});
        })
        .catch(error => {
            console.log(error);
        });
});

//Static files 
app.use(express.static('public'))

// Listen to the port 
app.listen(PORT, ()=>{
    console.log("Connection to PORT "+PORT);
});

//This function will get all of the repos information from the github API
function getListOfRepos(data){
    var list = [];
    data.forEach(function(d){ //go through the list of the repo objects
        var description = '';
        if(d['description'] == null){
            description = 'Repository has no description.' //check if repo has no des, then set a default description
        }
        else{
            description = d['description']; //if has des, then give var description that value
        }
        var content = { //objects of content will be passed onto the list 
            'fullname':d['full_name'],
            'url':d['html_url'],
            'update':d['updated_at'],
            'des':description
        };
        list.push(content);
    });
    return list.reverse();
}
