const express = require('express');
const Certificate = require('../models/certificate.model');
const Sequence = require('../models/sequence.model');
const pdfService = require('../services/pdfService');

const router = express.Router();

const getNextSequenceValue = async (sequenceName) => {
  const sequence = await Sequence.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequence.sequence_value;
};

router.post('/add', async (req, res) => {
  try {
    const certificateData = req.body;
    certificateData.number = await getNextSequenceValue('certificate');

    const certificate = new Certificate(certificateData);
    await certificate.save();
    res.status(200).json({ message: 'Certificate added!', certificate });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add certificate', error });
  }
});


router.get('/all', async (req, res) => {
  try {
    const certificates = await Certificate.find({});
    res.json(certificates);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
