
// TODO: Create an index.js if we need routes other than '/api'.
// Could even do it for the current error catching and rediricting.

var router = require('express').Router();

router.use('/auth', require('./apiAuth'));
router.use('/users', require('./apiUsers'));
router.use('/file', require('./apiFile'));

module.exports = router;