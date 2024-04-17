const mongoose = require('mongoose');

const SignInSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  // You can add additional fields such as name, age, etc. as needed
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = forms = mongoose.model('forms', SignInSchema);