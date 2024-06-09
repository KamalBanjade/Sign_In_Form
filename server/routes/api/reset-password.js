const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/forms'); // Adjust the model import if necessary

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find user by reset token and check if token is still valid
    const user = await User.findOne({ resetToken: token, tokenExpiration: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset token and expiration
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.tokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
