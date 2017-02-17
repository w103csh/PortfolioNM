
// -------------------------------------------------------------------------
// Passport middleware functions
//
// Not sure if should adding the functions directly to
// the required passport object is a good idea or not.
// -------------------------------------------------------------------------

const passport = require('passport');
const models = require('../models');

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
passport.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

// Issue remember me cookie or not and move on
passport.issueRemeberMeCookie = function(req, res, next) {
  if (!req.body.remember_me) {
    return next();
  }
  models.issueRememberMeToken(req.user.id, function(err, token) {
    // pass error along
    if (err) { return next(err); }
    // twenty second cookie for test
    //res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 20000 });
    // 7 day cookie for reals
    res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
    return next();
  });
}

module.exports = passport;