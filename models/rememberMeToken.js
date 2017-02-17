
const mongoose = require('mongoose');

// ---------------------------
// RememberMeToken schema and model
// ---------------------------

var rememberMeTokenSchema = new mongoose.Schema(
  {
    token: { type: String },
    user_id: { type: mongoose.Schema.ObjectId },
    createdDate: { type: Date },
  },
  { collection: 'rememberMeTokens'}
);

module.exports = {
  RememberMeToken: mongoose.model('RememberMeToken', rememberMeTokenSchema)
}