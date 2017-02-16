
const mongoose = require('mongoose');

// ---------------------------
// User schema and model
// ---------------------------

var userSchema = new mongoose.Schema(
  {
    email: { type: String },
    username: { type: String },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String }
  },
  { collection: 'users'}
);

module.exports = {
  User: mongoose.model('User', userSchema)
}