
const mongoose = require('mongoose');

// ---------------------------
// User schema and model
// ---------------------------

var userSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    phone: { type: String },
  },
  { collection: 'users'}
);

module.exports = {
  User: mongoose.model('User', userSchema)
}