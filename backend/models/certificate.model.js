const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    regNumber: Number,
    name: String,
    fromDate: Date,
    toDate: Date,
    subject: String,
    level: String,
    duration: Number,
    teacher: String,
    isKid: Boolean
});

module.exports = mongoose.model('Certificate', certificateSchema);
