var express = require('express');
var router = express.Router();
var db = require('../data/userdb');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', (req, res, next) => {
  db.queryUsers((err, rowCount, rows) => {
    if (err) return next(err);
    res.send(rows);
  });
});

router.put('/', function (req, res, next) {
  var data = req.body;
  db.createUsers(data, (err, rowCount, row) => {
    if (err) return next(err);
    res.send(`Added ${rowCount} records`)
  });
});

module.exports = router;
