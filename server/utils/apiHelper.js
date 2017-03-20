
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

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

module.exports = {

  /* PROCESSCAUGHTEXCEPTION
    *
    * TODO: The logic here is screwy
  */  
  processCaughtException(res, err, info, msg) {
    if (err) {
      err.message = msg + ' ' + err.message;
      // let the default error handler deal with it
      throw err;
    }
    else if (info) {
      // info messages should be ready to be display in the app
      res.status(200).json({ success: false, message: info.message });
      return true;
    }
    else {
      // no errors return false
      return false;
    }
  },
  

  /* PROCESSUNCAUGHTEXCEPTION
    *
    * Not used atm
  */
  processUncaughtException(ex, msg, res) {
    // TODO: should probably log this somewhere eventually
    console.log(ex.message);
    console.log(ex.stack);

    //res.json({ success: false, message: msg + ' UNCAUGHT EXCEPTION! ' + ex.message });
  },



  /* createJWT
    *
    * Description: 
    * Recieves: 
    * Required: 
    * Returns: 
  */
  createJWT(args, done) {

    if(args.type && args.id && args.algo && args.exp) {
      try {

        // TODO: consider adding machine id

        let payload, key, options = {};

        switch(args.algo) {
          // This is not being used but should work. I saved it in case a private/public key situation presents itself.
          case 'RS256':

            // TODO: file path
            fs.readFile(path.join(__dirname, '../', 'portfolioNM.private.PEM'), (err, privateKey) => {
              if (err) throw err;

              payload = { id: args.id };
              key     = { key: privateKey,
                          passphrase: process.env.JWT_RS256_KEY_PASSPHRASE };
              options = { expiresIn: args.exp,
                          algorithm: args.algo,
                          issuer: process.env.JWT_ISS,
                          subject: args.type, };

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

            });

            break;
          // HS256
          default:

            payload = { id: args.id };
            key     =   process.env.JWT_HS256_KEY;
            options = { expiresIn: args.exp,
                        algorithm: 'HS256',
                        issuer: process.env.JWT_ISS,
                        subject: args.type, };

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

            break;
        }

      }
      catch (err) {done(err, null); }
    }
    else { return done(true, null); }
  },


  /* verifyJWT
    *
    * Description: 
    * Recieves: 
    * Required: 
    * Returns: 
  */
  verifyJWT(args, done) {

    if(args.token.type && args.token.id && args.token.token && args.algo ) {
      try {

        let key, options = {};

        switch(args.algo) {
          // This is not being used but should work. I saved it in case a private/public key situation presents itself.
          case 'RS256':

            options = { algorithms: [args.algo],
                        issuer: process.env.JWT_ISS,
                        subject: args.token.type };

            jwt.verify(args.token.token, args.token.key, options, (err, payload) => {
              if (err) {
                // TODO: should probably log this somewhere eventually
                console.log(err.message);
                console.log(err.stack);

                return done(err, false);
              }
              else if (payload.id !== args.token.id) {
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
                        subject: args.token.type };

            jwt.verify(args.token.token, key, options, (err, payload) => {
              if (err) {
                // TODO: should probably log this somewhere eventually
                // verify throws errors if it can't verify. There is not a message or something in the payload.
                console.log(err.message);
                console.log(err.stack);

                return done(err, false);
              }
              else if (payload.id !== args.token.id) {
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
  },

}
