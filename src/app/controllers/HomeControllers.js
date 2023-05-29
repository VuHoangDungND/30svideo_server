class HomeControllers {
    //[GET] /home
    show(req, res, next) {
        res.send('connect');
    }
}

module.exports = new HomeControllers();
