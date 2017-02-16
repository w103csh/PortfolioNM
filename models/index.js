
// -------------------------------------------------------------------------
// Model helper functions
// -------------------------------------------------------------------------

const bcrypt = require('bcrypt-nodejs');
const TokenGenerator = require('uuid-token-generator');
const User = require('./user').User;
const RememberMeToken = require('./rememberMeToken').RememberMeToken;

// -------------------------------------------------------------------------
// User functions
// -------------------------------------------------------------------------

// Validates password using bcrypt
function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

// Generates hash using bcrypt
function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

// Recieves username and password strings,
//   finds if a User can use both and returns a validation message if not,
//   if good combo pass the User along
function validateUsernameAndPassword(username, password, done) {
  User.findOne({ $or: [{ 'username' :  username }, { 'email': username }] },
    function(err, user) {
      // mongoose error
      if (err) { return done(err); }
      // validation error
      else if (!user || !isValidPassword(user, password)) {
        return done(null, false, { message: 'Username and/or password is not recognized.' });
      }
      // gtg
      else {
        return done(null, user);
      }
    }
  );
}

// Recieves a User _id
//   and returns the associate User
function findUserById(id, done) {
  User.findOne({ '_id' :  id },
    function(err, user) {
      // mongoose error
      if (err) { return done(err); }
      // validation error
      // old one check if it works
      //if (!user) { return done(new Error('User ' + id + ' does not exist'), null); }
      if (!user) { return done(null, false, { message: msg }); }
      // gtg
      return done(null, user);
    }
  );
}

// Recieves an array of Users,
//   and returns a registration validation message string
function createRegisterUserInvalidMsg(users) {
  var msg = '';
  users.forEach(function (user) {
    if (user.username == username) {
      msg = (msg == '') ? msg = 'Username is ' : msg = msg.substr(0, msg.length-3) + 'and username are';
    }
    if (user.email == req.body.email) {
      msg = (msg == '') ? message = 'Email is ' : msg = msg.substr(0, msg.length-3) + 'and email are';
    }
  });
  msg = msg + ' already taken.';
  return msg;
}

// Recieves username and password strings,
//   finds Users associated with the strings and returns a validation message,
//   or if no Users are found creates a new User and returns it
function registerUser(req, username, password, done) {
  User.find({ $or: [{ 'username' :  username }, { 'email': req.body.email }] },
    function(err, users) {
      // mongoose error
      if (err) { return done(err); }
      // validation error
      else if (users.length > 0) {
        return done(null, false, { message: createRegisterUserInvalidMsg(users) });
      }
      // gtg
      else {
        // create the user
        var newUser = new User();
        // set the user's local credentials
        newUser.username = username;
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.email = req.body.email;
        newUser.password = createHash(password);

        // save the user
        newUser.save(function(err) {
          if (err) { done(err); }   
          return done(null, newUser);
        });
      }
    }
  );
}

// -------------------------------------------------------------------------
// Token functions
// -------------------------------------------------------------------------


// Should recieves either a token string, or a User object
//   finds any RememberMeTokens removing them from the database,
//   and returns a User.
//   If first argument is given we ignore user
function consumeRememberMeToken(token, user, done) {
  // Standard method used for the remember-me-strategy
  if (token) {
    RememberMeToken.findOne({ 'token' : token },
      function(err, rememberMeToken) {
        // mongoose error
        if (err) { return done(err); }
        // validation error
        if (!rememberMeToken) { return done(null, false, { message: 'Could not find matching token.' }); }

        // gtg
        var user_id = rememberMeToken.user_id;
        //console.log('Deleting remember me cookie ---------------------------> ' + rememberMeToken.token);
        rememberMeToken.remove();
        
        // find user to return
        User.findOne({ '_id' : rememberMeToken.user_id },
          function(err, user) {
            // mongoose error
            if (err) { return done(err); }
            // validation error
            if (!user) { return done(null, false, { message: 'Could not find user to match token.' }); }
            // gtg
            return done(null, user);
          }
        );
      }
    );
  }
  // User was not given so we find the tokens based on the user.
  //   This is to handle a login after the cookie expires.
  else {
    RememberMeToken.find({ 'user_id' : user._id },
      function(err, rememberMeTokens) {
        // mongoose error
        if (err) { return done(err); }
        // validation error
        if (rememberMeTokens.length > 0) {
          if (rememberMeTokens.length > 0) {
            // should do more here if this ever goes anywhere
            console.log('Warning: more than one rememberMeToken was found in the database for user ("' + user._id + '")');
          }
          rememberMeTokens.forEach((rmt) => {
            //console.log('Deleting remember me cookie ---------------------------> ' + rmt.token);
            rmt.remove();
          });
        }
        return done(null, user);
      }
    );
  }
}



// Recieves a user id,
//   saves a RememberMeToken to the database,
//   and returns the token string
function issueRememberMeToken(user_id, done) {
  let tokgen = new TokenGenerator();

  // create the token
  var newToken = new RememberMeToken();
  newToken.token = tokgen.generate();
  newToken.user_id = user_id;

  // save the token
  newToken.save(function(err) {
    if (err) { done(err); }
    return done(null, newToken.token);
  });
}


// -------------------------------------------------------------------------
// Exports
// -------------------------------------------------------------------------
module.exports = {

  // -----------------------------------------------------------------------
  // User functions
  // -----------------------------------------------------------------------
  validateUsernameAndPassword: validateUsernameAndPassword,
  findUserById : findUserById,
  registerUser: registerUser,

  // -----------------------------------------------------------------------
  // Token functions
  // -----------------------------------------------------------------------
  consumeRememberMeToken: consumeRememberMeToken,
  issueRememberMeToken : issueRememberMeToken,

}
