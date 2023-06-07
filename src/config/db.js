// Importing module
const mysql = require('mysql');

// Creating connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '30svideo',
});

db.connect(function (err) {
    if (err) return res.sendStatus(400);
    console.log('Connected!!!');
});

module.exports = db;
