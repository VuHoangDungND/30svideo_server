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
    if (err) throw err;
    console.log('Connected!!!');
});

module.exports = db;
