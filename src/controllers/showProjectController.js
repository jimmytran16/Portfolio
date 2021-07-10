const projectData = require('../utils/projectsData')

module.exports = function showProjectController(req, res, next) {
    let projectId = req.params.projectId;
    let data = projectData.subPage[projectId]

    res.render('entry/project', { data: data })
}