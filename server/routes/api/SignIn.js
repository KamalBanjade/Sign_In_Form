const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const forms = require('../../models/forms');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await forms.findOne({ email });
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ incorrectpassword: 'Incorrect password' });
    }

    // User matched
    res.json({ success: true, message: 'User successfully signed in' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
