'use strict'

const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/index')

// router to display the specfic project that is being reqested
router.get('/:projectId', controllers.showProjectController);

module.exports = router;