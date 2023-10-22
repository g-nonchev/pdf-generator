const mongoose = require('mongoose');
const USERNAME = 'certificatesDB';
const PASSWORD = encodeURIComponent('mrjtH4KSyHQg5Ooc');  // Ensure that special characters are URL-encoded
const DB_STRING = `mongodb://${USERNAME}:${PASSWORD}@vps.ezikovdom.com:27017/certificatesDB`;

const connectDB = async () => {
    await mongoose.connect(DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
};

module.exports = connectDB;