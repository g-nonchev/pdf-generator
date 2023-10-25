const express = require('express');
const passport = require('passport');
const FRONTEND_URI = process.env.FRONTEND_URL || 'http://localhost:5173';
const router = express.Router();

// Route to start Google authentication
router.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

// Callback route where Google redirects after authentication
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: `${FRONTEND_URI}/login-error` }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).send("Access restricted. Only specific accounts can access.");
    }

    res.redirect(`${FRONTEND_URI}/certificates`);
  }
);

// Logout

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(`${FRONTEND_URI}`);
  });
});

module.exports = router;
