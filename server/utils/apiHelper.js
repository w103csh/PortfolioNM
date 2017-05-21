
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// -------------------------------------------------------------------------
// Utility functions for the api calls
// -------------------------------------------------------------------------

  // comment template
  /* function_name
    *
    * Description: 
    * Recieves: 
    * Required: 
    * Returns: 
  */


/* createResponseData
  *
*/  
function createResponseData(success, msg, data) {
  return {
    success: success,
    message: msg,
    data: data
  };
};


/* processCaughtException
  *
  * TODO: The logic here is screwy
*/  
function processCaughtException(res, err, info, msg) {
  if (err) {
    err.message = msg + ' ' + err.message;
    // let the default error handler deal with it
    throw err;
  }
  else if (info) {
    // info messages should be ready to be display in the app
    let resData = createResponseData(false, info.message, null);
    res.status(200).json(resData);
    return true;
  }
  else {
    // no errors return false
    return false;
  }
}


/* processUncaughtException
  *
  * Not used atm
*/
function processUncaughtException(ex, msg, res) {
  // TODO: should probably log this somewhere eventually
  console.log(ex.message);
  console.log(ex.stack);

  //res.json({ success: false, message: msg + ' UNCAUGHT EXCEPTION! ' + ex.message });
}


/* processAuthHeader
  *
  * Description: 
  * Recieves: 
  * Required: 
  * Returns: 
*/
function processAuthHeader(req, next) {
  let authHeader = req.get('Authorization');
  if (authHeader && _.startsWith(authHeader, 'Bearer')) {

    let tokenCookie = JSON.parse(_.replace(authHeader, 'Bearer ', ''));
    let args = {
      token: tokenCookie.token,
      subject: tokenCookie.subject,
      algo: 'HS256',
    };

    verifyJWT(args, (err, success) => {
      if (success) {
        req.data = null;
        req.msg = 'Invalid token.';
      }
      next(success);
    });
  }
  else {
    req.data = null;
    req.msg = 'Authorization token not found.';
    next(false);
  }
}


/* createJWT
  *
  * Description: 
  * Recieves: 
  * Required: 
  * Returns: 
*/
function createJWT(params, done) {

  if(params.type && params.id && params.algo && params.exp) {
    try {

      // TODO: consider adding machine id
      let payload, key, options = {};

      switch(params.algo) {

        // This is not being used but should work. I saved it in case a private/public key situation presents itself.
        case 'RS256':

          // TODO: might need to be sync if used. And add path to environmental variables.
          fs.readFile(path.join(__dirname, '../', 'portfolioNM.private.PEM'), (err, privateKey) => {
            if (err) throw err;

            payload = { id: params.id,
                        rememberMe: params.rememberMe };
            key     = { key: privateKey,
                        passphrase: process.env.JWT_RS256_KEY_PASSPHRASE };
            options = { expiresIn: params.exp,
                        algorithm: params.algo,
                        issuer: process.env.JWT_ISS,
                        subject: params.type, };
          });
          break;

        // HS256
        default:

          payload = { id: params.id,
                      rememberMe: params.rememberMe };
          key     =   process.env.JWT_HS256_KEY;
          options = { expiresIn: params.exp,
                      algorithm: 'HS256',
                      issuer: process.env.JWT_ISS,
                      subject: params.type, };
          break;
      }

      jwt.sign(payload, key, options, (err, token) => {
        if (err) {
          // TODO: should probably log this somewhere eventually
          console.log(err.message);
          console.log(err.stack);

          throw err;
        }
        else {
          // return data
          done(null, token);
        }
      });

    }
    catch (err) {done(err, null); }
  }
  else { return done(true, null); }
}


/* verifyJWT
  *
  * Description: 
  * Recieves: 
  * Required: 
  * Returns: 
*/
function verifyJWT(params, done) {

  if(params.subject && params.subject.type && params.subject.id && params.token && params.algo ) {
    try {

      let key, options = {};

      switch(options.algo) {
        // This is not being used but should work. I saved it in case a private/public key situation presents itself.
        case 'RS256':

          options = { algorithms: [params.algo],
                      issuer: process.env.JWT_ISS,
                      subject: params.subject.type };

          jwt.verify(params.token, params.token.key, options, (err, payload) => {
            if (err) {
              // TODO: should probably log this somewhere eventually
              console.log(err.message);
              console.log(err.stack);

              return done(err, false);
            }
            else if (payload.id !== params.token.id) {
              return done(null, false);
            }
            else {
              return done(null, true);
            }
          });

          break;
        // HS256
        default:

          key     =   process.env.JWT_HS256_KEY;
          options = { algorithms: ['HS256'],
                      issuer: process.env.JWT_ISS,
                      subject: params.subject.type };

          jwt.verify(params.token, key, options, (err, payload) => {
            if (err) {
              // TODO: should probably log this somewhere eventually
              // verify throws errors if it can't verify. There is not a message or something in the payload.
              console.log(err.message);
              //console.log(err.stack);

              return done(err, false);
            }
            else if (payload.id !== params.subject.id) {
              return done(null, false);
            }
            else {
              return done(null, true);
            }
          });

          break;
      }

    }
    catch (err) {done(err, null); }
  }
  else { return done(true, null); }
}

module.exports = {
  createResponseData: createResponseData,
  processCaughtException: processCaughtException,
  processUncaughtException: processUncaughtException,
  processAuthHeader: processAuthHeader,
  createJWT: createJWT,
  verifyJWT: verifyJWT,
}
