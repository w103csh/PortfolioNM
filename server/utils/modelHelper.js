
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
    if (err) return done(err, null);
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
      if (err) return done(err, null);
      return done(null, hash);
    });
  });
}

/* removePassword
*/
function removePassword(user) {
  user = user.toObject();
  return _.omit(user, 'password');
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
    User.findOneAsync({ $or: [{ 'username': username }, { 'email': username }] })
      .then((user) => {
        // TODO: there is probably a cleaner way to do this
        if (user) {
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
    User.findOneAsync({ '_id': id })
      .then((user) => {
        // didn't find user
        if (!user) { return done(null, false, 'Could not find user from id provided.'); }
        //gtg
        user = user.toObject();
        return done(null, _.omit(user, 'password'));
      })
      .error((err) => { return done(err, null); })
      .catch((err) => { return done(err, null); });
  },


  /* createUser
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
              newUser.saveAsync()
                .then((newUser) => {
                  if(newUser) {
                    removePassword(newUser);
                    return done(null, newUser);
                  }
                  else {
                    return done(null, null, 'User not created.');
                  }
                })
                .error((err) => {
                  console.log('Error: createUser - ' + err);
                  return done(err, null);
                })
                .catch((err) => {
                  console.log('Catch: createUser - ' + err);
                  return done(err, null);
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


  /* updateUser
    *
    * Description:  
    * Recieves: User
    * Required: User.email, 
    * Returns: callback with error, new User, message with validation error 
  */
  updateUser(user, done) {

    let props = ['id', 'email'];

    let query = _.mapKeys(_.pick(user, props), (value, key) => { return (key == 'id') ? '_id' : key; });
    let doc = { $set: _.omit(user, props.push('password')) };
    let options = {
      new: true,
      runValidators: true,
    };

    User.findOneAndUpdateAsync(query, doc, options)
      .then((updatedUser) => {
        // console.log(updatedUser);

        if (updatedUser) {
          removePassword(updatedUser);
          return done(null, updatedUser);
        }
        else {
          return done(null, null, 'User not updated.');
        }
      })
      .error((err) => {
        console.log('Error: updateUser - ' + err);
        return done(err, null);
      })
      .catch((err) => {
        console.log('Catch: updateUser - ' + err);
        return done(err, null);
      });
  },

}
