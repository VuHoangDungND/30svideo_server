const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');
const { promisify } = require('util');
const { json } = require('express/lib/response');
const unlinkAsync = promisify(fs.unlink);

class UserControllers {
    //[GET] /user/
    show(req, res, next) {
        let myUser = req.decoded;
        // Creating Query
        let query =
            "SELECT  t.id_user, t.nickname, t.full_name, t.avatar, t.tick, t.followers, t.following, t.total_likes, t.id_video , t.video_url, t.music, t.download,t.share,t.description,t.likes,t.comments , COUNT(d.id_user_follower) AS follow_user  FROM ( SELECT a.id_user, a.nickname, a.full_name, a.avatar, a.tick, a.followers, a.following, a.total_likes, c.id_video , c.video_url, c.music, c.download,c.share,c.description,c.likes,c.comments FROM users a, user_have_videos b, videos c WHERE a.id_user = b.id_user AND c.id_video = b.id_video ) AS t LEFT JOIN user_follow_user d ON d.id_user_following = t.id_user AND d.id_user_follower LIKE '" +
            myUser.id_user +
            "' GROUP BY   t.id_user, t.nickname, t.full_name, t.avatar, t.tick, t.followers, t.following, t.total_likes, t.id_video , t.video_url, t.music, t.download,t.share,t.description,t.likes,t.comments  ORDER BY RAND()";

        db.query(query, function (err, result) {
            if (err) return res.status(400);
            res.status(200).json({ data: result });
        });
    }

    //[GET] /user/suggestAccounts
    showSuggestAccounts(req, res, next) {
        var { type } = req.query;
        let myUser = req.decoded;
        var query;
        console.log(myUser);

        // Creating Query
        if (type === 'less') {
            query =
                "SELECT a.id_user, a.nickname, a.full_name, a.avatar, a.tick, a.followers, a.total_likes, COUNT(b.id_user_follower) as follow_user FROM users a LEFT JOIN user_follow_user b ON a.id_user = b.id_user_following AND b.id_user_follower LIKE '" +
                myUser.id_user +
                "' GROUP BY  a.id_user, a.nickname, a.full_name, a.avatar, a.tick, a.followers, a.total_likes LIMIT 5";
        } else if (type === 'more') {
            query =
                'SELECT a.id_user, a.nickname, a.full_name, a.avatar, a.tick, a.followers, a.total_likes, COUNT(b.id_user_follower) as follow_user FROM users a LEFT JOIN user_follow_user b ON a.id_user = b.id_user_following AND b.id_user_follower LIKE ' +
                myUser.id_user +
                ' GROUP BY  a.id_user, a.nickname, a.full_name, a.avatar, a.tick, a.followers, a.total_likes LIMIT 10';
        }

        //response
        db.query(query, function (err, result) {
            if (err) return res.status(400);
            res.status(200).json({ data: result });
        });
    }

    //[GET] /user/
    showUser(req, res, next) {
        res.status(200).json({ data: req.decoded });
    }

    //[GET] /user/userProfile
    showUserProfile(req, res, next) {
        var { id_user } = req.query;
        var query;

        // Creating Query
        query = "SELECT * FROM users WHERE id_user = '" + id_user + "'";

        //response
        db.query(query, function (err, result) {
            if (err) return res.status(400);
            res.status(200).json({ data: result });
        });
    }

    //[GET] /user/videos
    showListVideos(req, res, next) {
        var { id_user } = req.query;
        var query;

        // Creating Query
        query =
            "SELECT * FROM videos, user_have_videos WHERE videos.id_video = user_have_videos.id_video AND user_have_videos.id_user = '" +
            id_user +
            "'";

        //response
        db.query(query, function (err, result) {
            if (err) return res.status(400);
            res.status(200).json({ data: result });
        });
    }

    //[POST] /user/uploadVideo
    async uploadVideo(req, res, next) {
        const file = req.file;
        const info = JSON.parse(JSON.parse(JSON.stringify(req.body)).info);
        const user = req.decoded;
        var dataVideo, queryCreateVideo, queryUserHaveVideo;
        console.log(user.id_user);
        console.log(info.description);
        try {
            await cloudinary.uploader.upload(
                file.path,
                {
                    resource_type: 'video',
                    folder: 'video',
                },
                function (err, result) {
                    dataVideo = result;
                },
            );
        } catch (error) {
            console.log(error);
        }

        console.log(dataVideo);
        await unlinkAsync(file.path);

        // Creating Query
        queryCreateVideo =
            "INSERT INTO videos (id_video, video_url, description, music) VALUES ('" +
            dataVideo.asset_id +
            "', '" +
            dataVideo.url +
            "', '" +
            info.description +
            "', '" +
            info.music +
            "') ";

        queryUserHaveVideo =
            "INSERT INTO user_have_videos (id_user, id_video) VALUES ('" +
            user.id_user +
            "', '" +
            dataVideo.asset_id +
            "') ";
        //response
        db.query(queryCreateVideo, function (err, result) {
            if (err) return res.status(400);
        });

        db.query(queryUserHaveVideo, function (err, result) {
            if (err) return res.status(400);
        });

        res.json({ messege: 'upload video thanh cong' });
    }
}

module.exports = new UserControllers();
