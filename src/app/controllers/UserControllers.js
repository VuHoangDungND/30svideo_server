const db = require('../../config/db');

class UserControllers {
    //[GET] /
    show(req, res, next) {
        // Creating Query
        let query =
            'SELECT * FROM videos  , users , user_videos WHERE videos.id_video = user_videos.id_video AND user_videos.id_user= users.id_user';

        db.query(query, function (err, result) {
            if (err) throw err;
            res.json({ data: result });
        });
    }

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
            res.json({ data: result });
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
            res.json({ data: result });
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
            res.json({ data: result });
        });
    }

    //[POST] /user/login
    login(req, res, next) {
        var { username, password } = req.body;
        let query;

        // Creating Query
        query =
            "SELECT users.* FROM accounts,users WHERE username LIKE  '" +
            username +
            "' AND password LIKE '" +
            password +
            "' AND accounts.id_user = users.id_user";

        //respone
        db.query(query, function (err, result) {
            if (err) throw err;
            console.log(Math.random().toString(16).slice(2));
            if (result.length === 0) res.json({ message: 'Tài khoản không tồn tại', data: null });
            else res.json({ message: 'Đăng nhập thành công', data: result });
        });
    }

    //[POST] /user/register
    register(req, res, next) {
        var { username, password } = req.body;
        let query;

        // Creating Query
        queryCheck = "SELECT * FROM accounts WHERE username LIKE  '" + username + "'";
        queryUpdate = "UPDATE accounts SET username = '" + username + "'";
        //respone
        db.query(query, function (err, result) {
            if (err) throw err;
            console.log(result);
            if (result.length === 0)
                res.json({
                    message: 'Tài khoản đã tồn tại. Vui lòng nhập tài khoản khác',
                    data: null,
                });
            else res.json({ message: 'Đăng ký tài khoản thành công', data: result });
        });
    }
}

module.exports = new UserControllers();
