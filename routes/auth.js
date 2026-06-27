const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, photoURL, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, photoURL, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, photoURL: user.photoURL, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie('token', token, cookieOptions);

    res.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email, photoURL: user.photoURL, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: false }, (err, user) => {
      if (err || !user) return res.redirect(`${process.env.CLIENT_URL}/login`);
      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name, photoURL: user.photoURL, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };
      res.cookie('token', token, cookieOptions);
      res.redirect(`${process.env.CLIENT_URL}/`);
    } catch {
      res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  }
);

router.post('/logout', (_req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.json({ message: 'Logged out successfully' });
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
