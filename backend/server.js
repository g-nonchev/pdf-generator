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
