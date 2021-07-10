module.exports = function adminLoginPageController(req, res, next){
    console.log(req.session);
    if (req.query.msg) {
        if (req.query.msg == 'error') {
            return res.render('admin/login.ejs', { error: 'Invalid password or username' });
        } else {
            return res.render('admin/login.ejs', { error: null })
        }
    }
    return res.render('admin/login.ejs', { error: null })
}