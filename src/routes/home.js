'use strict'

const express = require('express');
const router = express.Router()
const path = require('path');
const projectData = require('../utils/projectsData')
const getAllBlogsController = require('../controllers/getAllBlogsController')

// const the_path = path.join(__filename,'../../templates','index.html');
// console.log(the_path);

router.get('/',(request,response)=>{
    // response.sendFile(path.join(__dirname,'../public','index.html'));
    let data = projectData.indexPage
    let blogs = []
    // use the controller to get all blog posts
    getAllBlogsController((err,blogData) =>  {
        if (err) console.log(err);
        else {
            blogs = blogData;
        }
        console.log(blogData)
        response.render('entry/index' , { data:data, blogs:blogs })
    });
});

module.exports = router;
