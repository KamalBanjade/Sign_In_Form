const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/forms');

// Route to handle sign-in
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Received email: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Sign-in successful' });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
