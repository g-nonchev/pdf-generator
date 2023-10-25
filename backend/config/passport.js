const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4621';


module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${BACKEND_URL}/auth/google/callback`
  }, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ googleId: profile.id });

    if (user) {
      return done(null, user);

    } else {
      return done(null, false, { message: 'Access restricted. Only specific accounts can access.' });
      // const newUser = new User({
      //   googleId: profile.id,
      //   displayName: profile.displayName,
      //   profileEmail: profile.emails[0].value
      // });

      // await newUser.save();
      // return done(null, newUser);
    }
  }));

  passport.serializeUser((user, done) => {
    // console.log("Serializing user:", user);
    done(null, user.id);
  });



  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      // console.log("Deserializing user:", user);
      done(null, user);
    } catch (err) {
      // console.error("Error during deserialization:", err);
      done(err);
    }
  });


};
