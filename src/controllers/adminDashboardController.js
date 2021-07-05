const configs = require('../config/config')

module.exports = function adminDashboardController(req, res, next) {
    let code_sample = configs.CODE_SAMPLE;
    // set dashboard to have no cache, so user can't use back button to go back to content after they log out
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('admin/dashboard.ejs', { code: code_sample });
}