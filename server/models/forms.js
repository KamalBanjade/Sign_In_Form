const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  resetToken: {
    type: String
  },
  tokenExpiration: {
    type: Date
  }
});

// Hash the password before saving the user
SignInSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('forms', SignInSchema);
