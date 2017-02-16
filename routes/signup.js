
var router = require('express').Router();
const passport = require('passport');

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', { message: req.flash('error') });
});

/* POST signup page. */
router.post('/',
  passport.authenticate('signup', { failureRedirect: '/signup', failureFlash: true }),
  function(req, res, next) {
    res.redirect('/');
  }
);

module.exports = router;
