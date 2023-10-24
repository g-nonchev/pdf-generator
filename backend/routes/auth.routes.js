const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route to start Google authentication
router.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

// Callback route where Google redirects after authentication
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URI}/login-error` }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).send("Access restricted. Only specific accounts can access.");
    }
    // Successful login, send a success message or token to frontend
    res.redirect(`${process.env.FRONTEND_URI}`);
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${process.env.FRONTEND_URI}`); // Redirect to the frontend Vue app
});

module.exports = router;
