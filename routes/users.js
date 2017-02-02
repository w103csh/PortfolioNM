var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  // res.download('./public/files/here is a file.txt', 'test_file.txt', function(err) {
  //   console.log(err);
  // });
});

module.exports = router;
