const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4621/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ googleId: profile.id });

    if (user) {
      return done(null, user);
    } else {
      const newUser = new User({
        googleId: profile.id,
        displayName: profile.displayName
      });

      await newUser.save();
      return done(null, newUser);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
