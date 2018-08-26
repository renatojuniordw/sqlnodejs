var tedious = require('tedious');

var Connection = tedious.Connection;
var Request = tedious.Request;

var config = {
    userName: '',
    password: '',
    server: '',
    options: {
        database: '',
        encrypt: true,
        rowCollectionOnRequestCompletion: true
    }
};

var createUsers = (data, callback) => {
    var connection = new Connection(config);
    connection.on('connect', (err) => {
        if (err) {
            callback(err);
        } else {
            var request = new Request(
                `INSERT INTO dbo.users (name, email) values ('${data.name}', '${data.email}')`,
                (err, rowCount) => {
                    callback(err, rowCount);
                }
            );
            connection.execSql(request);
        }
    });
}

var queryUsers = (callback) => {
    var connection = new Connection(config);
    connection.on('connect', (err) => {
        if (err) {
            callback(err)
        } else {
            var request = new Request(
                `SELECT * FROM users`,
                (err, rowCount, row) => {
                    callback(err, rowCount, row);
                }
            );
            connection.execSql(request);
        }
    })
};

module.exports = {
    createUsers: createUsers,
    queryUsers: queryUsers
}