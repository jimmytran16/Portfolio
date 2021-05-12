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
    response.render('entry/index' , { data:data })
});

module.exports = router;
