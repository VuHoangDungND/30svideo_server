const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');
const { promisify } = require('util');
const { json } = require('express/lib/response');
const unlinkAsync = promisify(fs.unlink);

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
