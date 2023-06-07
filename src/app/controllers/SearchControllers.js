const db = require('../../config/db');

class SearchControllers {
    //[GET] /search?q=...&type=...
    show(req, res, next) {
        var { q, type } = req.query;
        var query;

        // Creating Query
        if (type === 'less') {
            query =
                "SELECT * FROM `users` WHERE `nickname` REGEXP '" +
                q +
                "' OR `full_name` REGEXP '" +
                q +
                "' LIMIT 5";
        } else {
            query =
                "SELECT * FROM `users` WHERE `nickname` REGEXP '" +
                q +
                "' OR `full_name` REGEXP '" +
                q +
                "'";
        }

        //response
        db.query(query, function (err, result) {
            if (err) return res.sendStatus(400);
            res.status(200).json({ data: result });
        });
    }
}

module.exports = new SearchControllers();
