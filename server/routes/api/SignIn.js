const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const forms = require('../../models/forms');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Received email: ${email}, password: ${password}`);

  try {
    const user = await forms.findOne({ email });
    if (!user) {
      console.log('Email not found');
      return res.status(404).json({ message: 'Email not found' });
    }

    console.log(`Stored hashed password: ${user.password}`);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match result: ${isMatch}`);
    if (!isMatch) {
      console.log('Incorrect password');
      return res.status(400).json({ message: 'Incorrect password' });
    }

    console.log('User successfully signed in');
    res.json({ success: true, message: 'User successfully signed in' });
  } catch (err) {
    console.error('Error in sign-in process:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
