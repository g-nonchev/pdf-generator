const express = require('express');
const connectDB = require('./utils/database');
const cors = require('cors');
const certificateRoutes = require('./routes/certificateRoutes');

const PORT = 4621;
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'  // replace with your Vue app's address
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
