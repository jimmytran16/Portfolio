module.exports = function notFoundController(req,res,next) {
    res.status(404).render('error/404.ejs');
}