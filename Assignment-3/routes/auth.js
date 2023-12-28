
const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});