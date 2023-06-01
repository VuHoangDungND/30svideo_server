const db = require('../../config/db');

class HomeControllers {
    //[GET] /
    show(req, res, next) {
        // Creating Query
        let query =
            'SELECT * FROM videos  , users , user_videos WHERE videos.id_video = user_videos.id_video AND user_videos.id_user= users.id_user ORDER BY RAND()';

        db.query(query, function (err, result) {
            if (err) throw err;
            res.json({ data: result });
        });
    }

    //[POST] /
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
