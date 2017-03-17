
const mongoose = require('mongoose');

// ---------------------------
// User schema and model
// ---------------------------

var userSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String }
  },
  { collection: 'users'}
);

module.exports = {
  User: mongoose.model('User', userSchema)
}