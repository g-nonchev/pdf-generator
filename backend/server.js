const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const certificateRoutes = require('./routes/certificateRoutes');

const app = express();
const DB_STRING = 'mongodb://localhost:27017/certificatesDB';


// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5173'  // replace with your Vue app's address
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Could not connect to MongoDB:', error));

// Using routes
app.use('/certificates', certificateRoutes);

const PORT = 4621;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
