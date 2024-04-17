const express = require('express');
const router = express.Router();
const forms = require('../../../models/forms');

// @route   POST api/signin
// @desc    Sign in a user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  forms.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: 'Email not found' });
      }

      // Check password
      if (user.password !== password) {
        return res.status(400).json({ incorrectpassword: 'Incorrect password' });
      }

      // User matched
      res.json({ success: true, message: 'User successfully signed in' });
    })
    .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

module.exports = router;