const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    name: String,
    fromDate: Date,
    toDate: Date,
    subject: String,
    level: String,
    duration: Number,
    teacher: String
});

module.exports = mongoose.model('Certificate', certificateSchema);
