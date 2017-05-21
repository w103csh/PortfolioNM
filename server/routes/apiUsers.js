
var router = require('express').Router();
const apiHelper = require('../utils').apiHelper;
const modelHelper = require('../utils').modelHelper;

// -------------------------------------------------------------------------
// Users api
// -------------------------------------------------------------------------


/* PARAMETERS id
  *
*/
router.param('user_id', (req, res, next, user_id) => {
  process.nextTick(() => {
    apiHelper.processAuthHeader(req, (success) => {

      if(success) {
        modelHelper.findUserById(user_id, (err, user, msg) => {
          if (err) { throw err; }
          req.data = user;
          req.msg = msg;
          next();
        });
      }
      else {
        next();
      }

    });
  });
});


/* GET id
  *
*/
router.get('/:user_id', (req, res, next) => {
  let resData = apiHelper.createResponseData(Boolean(req.data), req.msg, new Array(req.data));
  res.json(resData);
});


/* POST create
  *
  * Receives: req.body should be a user json object.
  * Required: user.email, and user.password.
  * Returns:  User
*/
router.post('/create', (req, res) => {
  // TODO: move common logic
  var successMsg = 'Create user successful.';
  var failureMsg = 'Create user failed.';
  var user = req.body;

  // validate req data
  if (user && user.email && user.password) {

    // async business logic
    process.nextTick(() => {
      modelHelper.createUser(user, (err, user, info) => {
        // respond with any errors
        if (!apiHelper.processCaughtException(res, err, info, failureMsg)) {
          // return user
          let resData = apiHelper.createResponseData(true, successMsg, user);
          res.json(resData);
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


/* POST update
  *
*/
router.post('/update', (req, res) => {

  process.nextTick(() => {
    apiHelper.processAuthHeader(req, (success) => {

      if(success) {

        // TODO: move common logic
        var successMsg = 'Update user successful.';
        var failureMsg = 'Update user failed.';
        var user = req.body;

        // This should never happen. It would either be a big mistake or someone trying to hack in.
        // BIG TODO: log this. If I ever make a propper logger things like this should be high priority.
        if (user && user.password) {
          let resData = apiHelper.createResponseData(false, 'Password was found in request. This shouldn\'t happen. Don\'t do this!', null);
          res.status(400).json(resData);
        }
        // validate req data
        else if (user && user.id && user.email) {

          // async business logic
          process.nextTick(() => {
            modelHelper.updateUser(user, (err, user, info) => {
              // respond with any errors
              if (!apiHelper.processCaughtException(res, err, info, failureMsg)) {
                // return updated user
                let resData = apiHelper.createResponseData(true, successMsg, user);
                res.json(resData);
              }
            });
          });

        }
        // request validation failed
        else {
          let resData = apiHelper.createResponseData(false, failureMsg + ' Id and email not available in request.', null);
          res.status(400).json(resData);
        }

      }
      else {
        let resData = apiHelper.createResponseData(false, failureMsg + ' ' + req.msg, null);
        res.status(400).json(resData);
      }

    });
  });

});

module.exports = router;
