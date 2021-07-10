const configs = require('../config/admin.config')

module.exports = function adminLogoutController(req , res, next) {
    req.session.destroy();
    res.redirect(configs.LOGIN_URL);
}