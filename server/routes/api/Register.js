const express = require('express');
const router = express.Router();
const forms = require('../../models/forms');

// @route   POST api/register
// @desc    Register a new user
// @access  Public
router.post('/', (req, res) => {
  const { username, email, password } = req.body;

  // Check if email already exists
  forms.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ emailExists: 'Email already exists' });
      }

      // Create a new user
      const newUser = new forms({
        username,
        email,
        password
      });

      // Save the user to the database
      newUser.save()
        .then(user => res.json({ success: true, message: 'User successfully registered' }))
        .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
    })
    .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

module.exports = router;