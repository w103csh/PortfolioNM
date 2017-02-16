
var router = require('express').Router();
const models = require('../models');

/* GET logout page. Well there is no page. */
router.get('/',
  function(req, res, next) {
      models.consumeRememberMeToken(req.cookies.remember_me, req.user, function(err, user, done) {
        if (err) {
          // Need to do something else here if this get more serious
          console.log('Could not consume remember me token. ' + err);
          //throw err;
        }
        res.clearCookie('remember_me');
        req.logout();
        res.redirect('/');
      });
  }
);

module.exports = router;
