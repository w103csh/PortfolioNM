
var router = require('express').Router();
var fs = require('fs');
const apiHelper = require('../utils').apiHelper;
const modelHelper = require('../utils').modelHelper;


// -------------------------------------------------------------------------
// Auth routes
// -------------------------------------------------------------------------


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
router.post('/authenticate', (req, res) => {
  // TODO: move common logic
  var successMsg = 'Authentication successful.';
  var failureMsg = 'Authentication failed.';
  var body = req.body;

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
  if (body && body.email && body.password) {

    // async business logic
    process.nextTick(() => {
      modelHelper.validateUsernameAndPassword(body.email, body.password, (err, user, info) => {

        // respond with any errors
        if (!apiHelper.processCaughtException(res, err, info, failureMsg)) {

          // create a jwt
          let options = {
            type: 'User',
            id: user._id,
            algo: 'HS256',
            exp: body.rememberMe ? usr_rem_me_exp : usr_exp,
            rememberMe: body.rememberMe ? 'yes' : 'no',
          };

          apiHelper.createJWT(options, (err, token) => {
            if (err) throw err;

            // return token & subject data
            let data = {
              token: token,
              subject: { type: 'User', id: user._id },
            };

            let resData = apiHelper.createResponseData(true, successMsg, data);
            res.json(resData);
          });

        }

      });

    });

  }
  // request validation failed
  else {
    let resData = apiHelper.createResponseData(false, failureMsg + ' Email and password not available in request.', null);
    res.status(400).json(resData);
  }

});


/* GET verifyToken
  *
  *
*/
router.get('/verifyToken', (req, res) => {
  // TODO: move common logic
  var successMsg = 'Verify token successful.';
  var failureMsg = 'Verify token failed.';

  process.nextTick(() => {
    apiHelper.processAuthHeader(req, (success) => {
      
      let msg = success ? (successMsg + ' ' + req.msg) : (failureMsg + ' ' + req.msg);
      let resData = apiHelper.createResponseData(success, msg, null);
      return success ? res.json(resData) : res.status(400).json(resData);

    });
  });

});

module.exports = router;

