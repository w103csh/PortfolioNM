
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
function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

/* createHash
*/
function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
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
        // validation error
        if (!user || !isValidPassword(user, password)) {
          return done(null, false, { message: 'Username and/or password is not recognized.' });
        }
        // gtg
        else {
          return done(null, _.omit(user, 'password'));
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
        // validation error
        if (!user) { return done(null, false, { message: msg }); }
        // gtg
        else return done(null, user);
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
    UserM.findAsync({ 'email': user.email })
      .then((user) => {
        // validation error
        if (users.length > 0) {
          return done(null, false, { message: 'Email address is already taken.' });
        }
        // gtg
        else {
          var newUser = new User();
          newUser.firstName = user.firstName;
          newUser.lastName = user.lastName;
          newUser.email = user.email;
          newUser.password = createHash(user.password);

          // save the user
          newUser.saveAsync((err) => {
            if (err) return done(err);
            return done(null, _.omit(newUser, 'password'));
          });
        }
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
          var newUser = new User();
          newUser.firstName = user.firstName;
          newUser.lastName = user.lastName;
          newUser.email = user.email;
          newUser.password = createHash(user.password);

          // save the user
          newUser.saveAsync((err) => {
            if (err) return done(err);
            return done(null, _.omit(newUser, 'password'));
          });
        }
      })
      .error((err) => { return done(err, null); })
      .catch((err) => { return done(err, null); });
  },

}
