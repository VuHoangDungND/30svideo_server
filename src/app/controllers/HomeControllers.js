const db = require('../../config/db');

class HomeControllers {
    //[GET] /home
    show(req, res, next) {
        // Creating Query
        let query =
            'SELECT * FROM videos  , users , user_videos WHERE videos.id_video = user_videos.id_video AND user_videos.id_user= users.id_user';

        db.query(query, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    }

    //[POST] /home
    updateAccount(req, res, next) {
        console.log(req.body);
        // Creating Query
        let query =
            "INSERT INTO `accounts` (`id`, `name`, `username`, `password`) VALUES ('" +
            req.body.id +
            "','" +
            req.body.name +
            "','" +
            req.body.username +
            "','" +
            req.body.password +
            "');";

        console.log(query);
        db.query(query, function (err, result) {
            res.send(result);
            if (err) throw err;
        });
    }
}

module.exports = new HomeControllers();
