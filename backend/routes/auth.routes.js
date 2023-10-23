const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route to start Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Callback route where Google redirects after authentication
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:8080'); // Redirect to the frontend Vue app
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:8080'); // Redirect to the frontend Vue app
});

module.exports = router;
