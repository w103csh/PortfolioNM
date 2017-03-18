
var router = require('express').Router();
const apiHelper = require('../utils').apiHelper;
const modelHelper = require('../utils').modelHelper;

// -------------------------------------------------------------------------
// API routes
// -------------------------------------------------------------------------

// TODO better routing logic instead of dumping all the requests here

// comment template
/* function_name
  *
  * Description: 
  * Recieves: 
  * Required: 
  * Returns: 
*/

/* POST authenticate (only setup for user so far)
  *
  * Receives: req.body should be a user json object.
  * Required: user.email, and user.password.
  * Returns:  subject, and jsonwebtoken
*/
router.post('/auth/authenticate', function(req, res) {
  // TODO: move common logic
  var successMsg = 'Authentication successful.';
  var failureMsg = 'Authentication failed.';
  var user = req.body;

  var usr_exp = process.env.JWT_HS256_USR_EXP;
  var usr_rem_me_exp = process.env.JWT_HS256_USR_REM_ME_EXP;
  // var xxx_exp = process.env.JWT_RS256_XXX_EXP;
  // var xxx_rem_me_exp = process.env.JWT_RS256_XXX_REM_ME_EXP;

  // TODO: understand what commented out below really do and if you need them.
  // // catch unhandled exceptions (not sure if this does anything yet. might be able to remove it for default error handler in server-app.js)
  // process.on('uncaughtException', (unEx) => { apiUtils.processUncaughtException(unEx, failureMsg, res) })
  // process.on("unhandledRejection", function(p, why){
  //   console.log("FOUND ERROR!!!!", p , why);
  // });

  // validate req data
  if(user && user.email && user.password) {

    // async business logic
    process.nextTick(() => {
      modelHelper.validateUsernameAndPassword(user.email, user.password, (err, data, info) => {

        // respond with any errors
        if (!apiHelper.processCaughtException(res, err, info, failureMsg)) {
          // create a jwt
          let args = {
            type: 'User',
            id: data.id,
            algo: 'HS256',
            exp: user.rememberMe ? usr_rem_me_exp : usr_exp,
          };
          apiHelper.createJWT(args, (err, token) => {
            if (err) throw err;
            // return token & subject data
            res.json({ success: true, message: successMsg, data: { token: token, subject: data } });
          });
        }

      });

    });

  }
  // request validation failed
  else {
    res.status(400).json({ success: false, message: failureMsg + ' Email and password not available in request.' });
  }

});

/* POST verify (only setup for user so far)
  *
  * Receives: req.body should be an object with subject type, id, ?public key & jwt token. 
  * Required: token.type, token.id, and token.token.
  * Returns:  boolean
*/
router.post('/auth/verify', (req, res) => {
  // TODO: move common logic
  var successMsg = 'Verification successful.';
  var failureMsg = 'Verification failed.';
  var token = req.body;

  // validate req data
  if(token && token.type && token.id && token.token) {

    // async business logic
    process.nextTick(function() {
        // create a jwt
        let args = {
            token: token,
            algo: 'HS256',
        };
        apiHelper.verifyJWT(args, (err, success) => {
          // return verification
          res.json(success);
        });
    });

  }
  // request validation failed
  else {
    res.status(400).json({ success: false, message: failureMsg + ' Invalid request token.' });
  }

});

// -------------------------------------------------------------------------
// User api
// -------------------------------------------------------------------------


/* POST createUser
  *
  * Receives: req.body should be a user json object.
  * Required: user.email, and user.password.
  * Returns:  User
*/
router.post('/user/create', (req, res) => {
  // TODO: move common logic
  var successMsg = 'Create user successful.';
  var failureMsg = 'Create user failed.';
  var user = req.body;

  // validate req data
  if(user && user.email && user.password) {

    // async business logic
    process.nextTick(() => {
      modelHelper.createUser(user, (err, data, info) => {
        // respond with any errors
        if (!apiHelper.processCaughtException(res, err, info, failureMsg)) {
          // return user
          res.json({ success: true, message: successMsg, data: data });
        }
      });
    });

  }
  // request validation failed
  else {
    res.status(400).json({ success: false, message: failureMsg + ' Email and password not available in request.' });
  }

});

module.exports = router;
