const express = require('express');
const path = require('path');
const repoUtils  = require('./util/repoUtils.js')
const axios = require('axios');
const router = express.Router()
// const endpoint_url = require('./configs').endpoint_url; //Comment out for production
// console.log(endpoint_url) //Comment out for production

router.get('/',(request,res)=>{ /* Go to the repos HTML page*/
    const url = process.env.ENDPOINT_URL || endpoint_url //get the url endpoint from the enviroment
    axios.get(url)
        .then(response => {
            console.log(typeof(response.data));
            //make a function to get a list of url links to the repos
            list_of_repos = getListOfRepos(response.data);
            res.render(path.join(__dirname,'../views','index.ejs'), {'repos':list_of_repos});
        })
        .catch(error => {
            console.log(error);
            res.send({"Error":"Github API Server error!"});
        });
});

/* This function will get all of the repos information from the github API */
function getListOfRepos(data){
    var list = [];
    data.forEach(function(d){ //go through the list of the repo objects
        var description = '';
        if(d['description'] == null){
            description = 'Repository has no description.' //check if repo has no description, then set a default description
        }
        else{
            description = d['description']; //if has description, then give var description that value
        }
        var content = { //objects of content will be passed onto the list
            'fullname':d['full_name'],
            'url':d['html_url'],
            'update':repoUtils.formatDate(d['updated_at'].split("T")[0]),
            'des':description
        };
        list.push(content);
    });
    return repoUtils.sortByDate(list);
}

module.exports = router
