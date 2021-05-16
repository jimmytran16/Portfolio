'use strict'

const express = require('express')
const router = express.Router()

// router to handle 404 status codes
router.get('/' , (req,res) => {
    res.status(404).render('error/404.ejs')
})

module.exports = router;