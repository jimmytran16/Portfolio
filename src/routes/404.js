'use strict'

const express = require('express')
const router = express.Router()
const controllers = require('../controllers/index')

// route to handle page not found
router.get('/', controllers.notFoundController)

module.exports = router;