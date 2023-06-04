const db = require('../../config/db');
const jwt = require('jsonwebtoken');

class UserControllers {
    //[GET] /user/suggestAccounts
    showSuggestAccounts(req, res, next) {
        var { type } = req.query;
        var query;

        // Creating Query
        if (type === 'less') {
            query = 'SELECT * FROM `users`  LIMIT 5';
        } else if (type === 'more') {
            query = 'SELECT * FROM `users` LIMIT 10';
        }

        //response
        db.query(query, function (err, result) {
            if (err) throw err;
            res.status(200).json({ data: result });
        });
    }

    //[GET] /user/userProfile
    showUserProfile(req, res, next) {
        var { id_user } = req.query;
        var query;

        // Creating Query
        query = "SELECT * FROM users WHERE id_user = '" + id_user + "'";

        //response
        db.query(query, function (err, result) {
            if (err) throw err;
            res.status(200).json({ data: result });
        });
    }

    //[GET] /user/videos
    showListVideos(req, res, next) {
        var { id_user } = req.query;
        var query;

        // Creating Query
        query =
            "SELECT * FROM videos, user_videos WHERE videos.id_video = user_videos.id_video AND user_videos.id_user = '" +
            id_user +
            "'";

        //response
        db.query(query, function (err, result) {
            if (err) throw err;
            res.status(200).json({ data: result });
        });
    }
}

module.exports = new UserControllers();
