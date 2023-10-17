const mongoose = require('mongoose');

const SequenceSchema = new mongoose.Schema({
  _id: String,
  sequence_value: { type: Number, default: 0 }
});

const Sequence = mongoose.model('Sequence', SequenceSchema);  
