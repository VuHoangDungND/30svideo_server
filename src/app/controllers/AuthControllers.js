const db = require('../../config/db');
const jwt = require('jsonwebtoken');

class AuthControlllers {
    // authentication
    verifyToken(req, res, next) {
        const authorizationClient = req.headers['authorization'];
        const token = authorizationClient && authorizationClient.split(' ')[1];

        console.log(token);

        if (!token) {
            return res.status(401).send('A token is required for authentication');
        }

        jwt.verify(token, 'dungnd', function (err, decoded) {
            console.log(err, decoded);
        });
    }

    //[POST] /auth/login
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

            if (result.length === 0)
                res.status(200).json({ message: 'Tài khoản không tồn tại', data: null });
            else {
                res.status(200).json({ message: 'Đăng nhập thành công', data: result });
            }
        });
    }

    //[POST] /auth/register
    register(req, res, next) {
        var { username, password } = req.body;
        let queryCheck, queryCreateUser, queryCreateAccount;
        let id_user = Math.random().toString(12).slice(2);

        // Creating Query
        queryCheck = "SELECT * FROM accounts WHERE username LIKE  '" + username + "'";
        queryCreateUser =
            "INSERT INTO users (id_user, nickname, full_name) VALUES ('" +
            id_user +
            "', '" +
            id_user +
            "', '" +
            id_user +
            "') ";
        queryCreateAccount =
            "INSERT INTO accounts (id_user, username, password) VALUES ('" +
            id_user +
            "', '" +
            username +
            "', '" +
            password +
            "')";

        //respone
        db.query(queryCheck, function (err, result) {
            if (err) throw err;
            if (result.length !== 0)
                res.json({
                    message: 'Tài khoản đã tồn tại. Vui lòng nhập tài khoản khác',
                    data: null,
                });
            else {
                db.query(queryCreateUser, function (err, result) {
                    if (err) throw err;
                });
                db.query(queryCreateAccount, function (err, result) {
                    if (err) throw err;
                });
                res.json({ data: { id_user: id_user, nickname: id_user, full_name: id_user } });
            }
        });
    }
}

module.exports = new AuthControlllers();
