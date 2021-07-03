'use strict'

const express = require('express');
const router = express.Router()
const projectData = require('../utils/projectsData')
const getAllBlogsController = require('../controllers/getAllBlogsController')
const controllers = require('../controllers/index')

// main endpoint
router.get('/', controllers.getAllBlogsController);

module.exports = router;
