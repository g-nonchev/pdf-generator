const mongoose = require('mongoose');
const DB_STRING = 'mongodb://localhost:27017/certificatesDB'; // Replace with your MongoDB connection string

const connectDB = async () => {
    await mongoose.connect(DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
};

module.exports = connectDB;