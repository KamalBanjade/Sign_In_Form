const express = require('express');
const router = express.Router();
const forms = require('../../models/forms');

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email already exists
    let user = await forms.findOne({ email });
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
    await newUser.save();
    res.json({ success: true, message: 'User successfully registered' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
