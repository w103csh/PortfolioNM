
var router = require('express').Router();
const passport = require('passport');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { user: req.user, message: req.flash('error') });
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.post('/',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  passport.issueRemeberMeCookie,
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
