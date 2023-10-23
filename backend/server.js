const express = require('express');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const certificateRoutes = require('./routes/certificate.routes');
const connectDB = require('./utils/database');
const Sequence = require('./models/sequence.model');
const ensureAuthenticated = require('./middleware/auth');

dotenv.config();

const PORT = 4621;
const app = express();

// Middleware
const allowedOrigins = ['http://127.0.0.1:5173', 'http://127.0.0.1:4173', 'http://localhost:5173', 'http://localhost:4173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// Express session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport setup
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/auth', authRoutes);
app.use('/certificates', certificateRoutes);

connectDB().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });

  const initializeSequencesCollection = async () => {
    const certificateSequence = await Sequence.findById('certificate');
    if (!certificateSequence) {
      await Sequence.create({ _id: 'certificate', sequence_value: 0 });
      console.log("Initialized the 'certificate' sequence.");
    }
  };

  initializeSequencesCollection();
});
