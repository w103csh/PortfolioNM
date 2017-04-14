
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user').User;

  // comment template
  /* function_name
    *
    * Description: 
    * Recieves: 
    * Required: 
    * Returns: 
  */

// -------------------------------------------------------------------------
// Private functions
// -------------------------------------------------------------------------

/* isValidPassword
*/
function isValidPassword(user, password, done) {
  bcrypt.compare(password, user.password, (err, res) => {
    if(err) return done(err, null);
    return done(null, res);
  });
}

/* createHash
*/
function createHash(password, done) {
  // TODO: environmental variable this ish
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return done(err, null); 
    bcrypt.hash(password, salt, null, (err, hash) => {
      if(err) return done(err, null);
      return done(null, hash);
    });
  });
}

// -------------------------------------------------------------------------
// Utility functions for the models
// -------------------------------------------------------------------------

module.exports = {

  /* validateUsernameAndPassword
    *
    * Description: 
    * Recieves: username and password strings
    * Required: username and password strings
    * Returns: callback with error, User with password omitted, message with validation error
  */
  validateUsernameAndPassword(username, password, done) {
    User.findOneAsync({ $or: [{ 'username' :  username }, { 'email': username }] })
      .then((user) => {
        // TODO: there is probably a cleaner way to do this
        if(user) {
          user = user.toObject();
          isValidPassword(user, password, (err, res) => {
            if (err)
              throw err;
            else if (res)
              return done(null, _.omit(user, 'password'));
            else
              return done(null, false, { message: 'Username and/or password is not recognized.' });
          });
        }
        else {
          return done(null, false, { message: 'Username and/or password is not recognized.' });
        }
      })
      .error((err) => { return done(err, null); })
      .catch((err) => { return done(err, null); });
  },
  
  
  /* findUserById
    *
    * Description:  
    * Recieves: User id
    * Required: User id
    * Returns: callback with error, User
  */
  findUserById(id, done) {
    User.findOneAsync({ '_id' :  id })
      .then((user) => {
        user = user.toObject();
        // validation error
        if (!user) { return done(null, false, 'Something weird happened.'); }
        // gtg
        else return done(null, _.omit(user, 'password'));
      })
      .error((err) => { return done(err, null); })
      .catch((err) => { return done(err, null); });
  },


  /* findUserById
    *
    * Description:  
    * Recieves: User
    * Required: User.email, 
    * Returns: callback with error, new User, message with validation error 
  */
  createUser(user, done) {
    User.findAsync({ 'email': user.email })
      .then((users) => {
        // validation error
        if (users.length > 0) {
          return done(null, false, { message: 'Email address is already taken.' });
        }
        // gtg
        else {
          createHash(user.password, (err, hash) => {
            if (err)
              throw err;
            else {
              var newUser = new User();
              newUser.firstName = user.firstName;
              newUser.lastName = user.lastName;
              newUser.email = user.email;
              newUser.password = hash;

              // save the user
              newUser.saveAsync((err) => {
                if (err) return done(err);
                newUser = newUser.toObject();
                return done(null, _.omit(newUser, 'password'));
              });
            }
          });
        }
      })
      .error((err) => { 
        return done(err, null); 
      })
      .catch((err) => { 
        return done(err, null); 
      });
  },

}
