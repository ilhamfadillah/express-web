var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'express_crud'
});

connection.connect(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log('connected...!');
    }
});

module.exports = connection;