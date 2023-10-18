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
  const certificateData = new Certificate({
    ...req.body
  });
  try {
    certificateData.regNumber = await getNextSequenceValue('certificate');
    const savedCertificate = await certificateData.save();
    res.json(savedCertificate);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add certificate', error });
  }
});


router.get('/all', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ number: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/download/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch certificate details for the given ID using the Mongoose model
    const certificateData = await Certificate.findOne({ regNumber: id });

    if (!certificateData) {
      res.status(404).send('Certificate not found');
      return;
    }

    const filePath = await pdfService.generatePDF(certificateData); // Convert the Mongoose document to a plain JS object

    // Use Express's res.download() method to send the file
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error downloading the certificate');
      }

      // Optionally delete the file after sending to the client
      // fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing the request');
  }
});

module.exports = router;
