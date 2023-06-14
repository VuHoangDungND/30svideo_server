const db = require('../../config/db');

class HomeControllers {
    //[GET] /
    show(req, res, next) {
        // Creating Query
        let query =
            'SELECT * FROM videos  , users , user_have_videos WHERE videos.id_video = user_have_videos.id_video AND user_have_videos.id_user= users.id_user ORDER BY RAND()';

        db.query(query, function (err, result) {
            if (err) return res.status(400);
            res.status(200).json({ data: result });
        });
    }

    //[POST] /
    updateAccount(req, res, next) {
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

        db.query(query, function (err, result) {
            if (err) return res.status(400);
            res.send(result);
        });
    }
}

module.exports = new HomeControllers();
