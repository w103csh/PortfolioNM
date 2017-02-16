
// -------------------------------------------------------------------------
// Initializes the custom passport strategies
// -------------------------------------------------------------------------

var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy = require('passport-remember-me').Strategy;
const models = require('../models');

module.exports = function() {

  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    models.findUserById(id, function(err, user) {
      done(err, user);
    });
  });

  // Use the LocalStrategy within Passport.
  //   Strategies in passport require a `verify` function, which accept
  //   credentials (in this case, a username and password), and invoke a callback
  //   with a user object.  In the real world, this would query a database;
  //   however, in this example we are using a baked-in set of users.
  passport.use('local', new LocalStrategy(
    // return value is passed to serializeUser
    function(username, password, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        models.validateUsernameAndPassword(username, password, function(err, user, info) {
          // consume any old tokens
          models.consumeRememberMeToken(null, user, ()=>{});
          return done(err, user, info);
        });
      });
    }
  ));

  // Sign up strategy
  passport.use('signup', new LocalStrategy({ passReqToCallback: true },
    function(req, username, password, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        models.registerUser(req, username, password, function(err, user, info) {
          return done(err, user, info);
        });
      });
    }
  ));

  // Remember Me cookie strategy
  //   This strategy consumes a remember me token, supplying the user the
  //   token was originally issued to.  The token is single-use, so a new
  //   token is then issued to replace it.
  passport.use('remember_me', new RememberMeStrategy(
    function(token, done) {
      models.consumeRememberMeToken(token, null, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false), { message: 'Consume remember me token did not return a user.' }; }
        return done(null, user);
      });
    },
    models.issueRememberMeToken
  ));

}