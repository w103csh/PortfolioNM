
var router = require('express').Router();
const passport = require('passport');

// TODO: figure out better routing logic

/* GET home page. */
router.get('/',
  passport.authenticate('remember_me', { failureRedirect: '/login', failureFlash: true }),
  passport.ensureAuthenticated,
  function (req, res) {
    res.render('index', { user: req.user });
  }
);

/* GET home page. */
router.get('/index',
  passport.authenticate('remember_me', { failureRedirect: '/login', failureFlash: true }),
  passport.ensureAuthenticated,
  function (req, res) {
    res.render('index', { user: req.user });
  }
);

/* GET home page. */
router.get('/home',
  passport.authenticate('remember_me', { failureRedirect: '/login', failureFlash: true }),
  passport.ensureAuthenticated,
  function (req, res) {
    res.render('index', { user: req.user });
  }
);

module.exports = router;
