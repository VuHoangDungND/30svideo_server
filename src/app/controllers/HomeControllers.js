const db = require('../../config/db');

class HomeControllers {
    //[GET] /
    show(req, res, next) {
        // Creating Query
        let query =
            'SELECT * FROM videos  , users , user_have_videos WHERE videos.id_video = user_have_videos.id_video AND user_have_videos.id_user= users.id_user ORDER BY RAND() LIMIT 5';

        db.query(query, function (err, result) {
            if (err) return res.status(400);
            res.status(200).json({ data: result });
        });
    }

    //[GET] /userProfile
    showUserProfile(req, res, next) {
        var { id_user } = req.query;
        var query;

        // Creating Query
        query = "SELECT * FROM users WHERE id_user = '" + id_user + "'";

        //response
        db.query(query, function (err, result) {
            if (err) return res.status(400);
            res.status(200).json({ data: result[0] });
        });
    }

    //[GET] /watch
    watch(req, res, next) {
        var { id_user, id_video } = req.query;
        var query;

        // Creating Query
        query =
            "SELECT * FROM users a, user_have_videos b, videos c WHERE a.id_user = '" +
            id_user +
            "' AND a.id_user = b.id_user AND b.id_video = c.id_video AND c.id_video LIKE '" +
            id_video +
            "'";

        //response
        db.query(query, function (err, result) {
            if (err) return res.status(400);
            res.status(200).json({ data: result });
        });
    }

    //[POST] /download
    download(req, res, next) {
        var { id_video } = req.body;
        var query;

        // Creating Query
        query = "UPDATE videos SET download = download+1 WHERE id_video='" + id_video + "'";

        //response
        db.query(query, function (err, result) {
            if (err) return res.status(400);
        });
    }

    //[POST] /share
    share(req, res, next) {
        var { id_video } = req.body;
        var query;

        // Creating Query
        query = "UPDATE videos SET share = share+1 WHERE id_video='" + id_video + "'";

        //response
        db.query(query, function (err, result) {
            if (err) return res.status(400);
        });
    }

    //[GET] / commnets
    comments(req, res, next) {
        var { id_video } = req.query;
        var query;

        // Creating Query
        query =
            "SELECT * FROM user_comment_video a, users b WHERE a.id_user = b.id_user AND a.id_video LIKE '" +
            id_video +
            "'";

        //response
        db.query(query, function (err, result) {
            if (err) return res.status(400);
            res.status(200).json({ data: result });
        });
    }
}

module.exports = new HomeControllers();
