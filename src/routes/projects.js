const express = require('express')
const router = express.Router()
const projectData = require('../utils/projectsData')

// router to display the specfic project that is being reqested
router.get('/:projectId', (req,res) => {
    let projectId = req.params.projectId;
    let data = projectData.subPage[projectId]

    res.render('entry/project', { data: data })
})

module.exports = router;