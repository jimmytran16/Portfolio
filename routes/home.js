const express = require('express');
const router = express.Router()
const path = require('path');

const the_path = path.join(__filename,'../../templates','index.html');
console.log(the_path);

router.get('/',(req,res)=>{
    res.sendFile(path.join(__filename,'../../templates','index.html'));
});

module.exports = router;