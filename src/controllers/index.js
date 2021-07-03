const getAllBlogsController = require('./getAllBlogsController')
const readMoreController = require('./readMoreController')
const sendMessageController = require('./sendMessageController')
const notFoundController = require('./notFoundController')

module.exports = {
    getAllBlogsController:getAllBlogsController,
    readMoreController:readMoreController,
    sendMessageController:sendMessageController,
    notFoundController:notFoundController
}