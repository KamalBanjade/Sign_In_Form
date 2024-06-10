const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../../models/forms');

// Route to request password reset
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.tokenExpiration = Date.now() + 36000000; // 10 hours
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kamalbanjade2004@gmail.com', // Use environment variables
        pass: 'sfio nrlp bnvy cszo', // Use environment variables
      },
    });

    const mailOptions = {
      to: user.email,
      from: 'kamalbanjade2004@gmail.com', // Use environment variables
      subject: 'Password Reset',
      text: `Please click the following link to reset your password: http://localhost:5173/reset-password/${token}`
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
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
    let user = await User.findOne({
      resetToken: token,
      tokenExpiration: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.tokenExpiration = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password has been reset' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
