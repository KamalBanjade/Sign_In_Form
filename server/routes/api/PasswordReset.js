const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../../models/forms'); // Adjust the model import if necessary
const bcrypt = require('bcrypt');

// Route to request password reset
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate password reset token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.tokenExpiration = Date.now() + 36000000; // Token valid for 10 hours
    await user.save();

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kamalbanjade2004@gmail.com', // Your Gmail email address
        pass: 'sfio nrlp bnvy cszo', // Your app-specific password
      },
    });

    // Prepare email content
    const mailOptions = {
      to: user.email,
      from: 'kamalbanjade2004@gmail.com', // Replace with your Gmail email address
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
        + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
        + `http://localhost:5173/reset-password/${token}\n\n` // Ensure this path matches the route in your React app
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    // Send email
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
        console.log('Password reset email sent');
        res.status(200).json({ success: true, message: 'Recovery email sent' });
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to reset password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find user by reset token and ensure token is not expired
    let user = await User.findOne({
      resetToken: token,
      tokenExpiration: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.tokenExpiration = undefined;

    // Save user
    await user.save();

    res.status(200).json({ success: true, message: 'Password has been reset' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
