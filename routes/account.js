
var router = require('express').Router();
const passport = require('passport');
const models = require('../models');

/* GET account page. */
router.get('/',
  passport.authenticate('remember_me', { failureRedirect: '/login', failureFlash: true }),
  passport.ensureAuthenticated,
  function(req, res, next) {
    res.render('account', { user: req.user });
  }
);

module.exports = router;
