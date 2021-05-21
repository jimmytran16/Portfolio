'use strict'

const express = require('express');
const router = express.Router()
const projectData = require('../utils/projectsData')
const getAllBlogsController = require('../controllers/getAllBlogsController')

// main endpoint
router.get('/',(request,response)=>{
    // response.sendFile(path.join(__dirname,'../public','index.html'));
    let data = projectData.indexPage
    let blogs = []
    let message = request.query.message
    let success = message === 'Sucessfully Sent!'
    // use the controller to get all blog posts
    getAllBlogsController((err,blogData) =>  {
        
        if (err) console.log(err);
        else blogs = blogData;
        
        response.render('entry/index' , { data:data, blogs:blogs, message:request.query.message, success: success })
    });
});

module.exports = router;
