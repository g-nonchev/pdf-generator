const express = require('express');
const connectDB = require('./utils/database');
const cors = require('cors');
const certificateRoutes = require('./routes/certificate.routes');

const PORT = 4621;
const app = express();

// Middleware
const allowedOrigins = ['http://127.0.0.1:5173', 'http://127.0.0.1:4173', 'http://localhost:5173', 'http://localhost:4173'];

app.use(cors({
  origin: function (origin, callback) {
    // If no origin or if it's found in the list, allow, else reject
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

// Using routes
app.use('/certificates', certificateRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
});

const Sequence = require('./models/sequence.model');

const initializeSequencesCollection = async () => {
  const certificateSequence = await Sequence.findById('certificate');
  if (!certificateSequence) {
    await Sequence.create({ _id: 'certificate', sequence_value: 0 });
    console.log("Initialized the 'certificate' sequence.");
  }
};

initializeSequencesCollection();
