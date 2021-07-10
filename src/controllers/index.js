const getAllBlogsController = require('./getAllBlogsController')
const readMoreController = require('./readMoreController')
const sendMessageController = require('./sendMessageController')
const notFoundController = require('./notFoundController')
const adminLoginController = require('./adminLoginController')
const adminLoginPageController = require('./adminLoginPageController')
const adminDashboardController = require('./adminDashboardController')
const adminLogoutController = require('./adminLogoutController')
const submitPostController = require('./submitPostController')
const showProjectController = require('./showProjectController')

module.exports = {
    getAllBlogsController:getAllBlogsController,
    readMoreController:readMoreController,
    sendMessageController:sendMessageController,
    notFoundController:notFoundController,
    adminLoginController:adminLoginController,
    adminLoginPageController:adminLoginPageController,
    adminDashboardController:adminDashboardController,
    adminLogoutController:adminLogoutController,
    submitPostController:submitPostController,
    showProjectController:showProjectController
}