const express = require('express');
const Certificate = require('../models/certificate');
const pdfService = require('../services/pdfService');

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        // Store data in MongoDB
        const certificate = new Certificate(req.body);
        await certificate.save();

        // Generate PDF
        const pdfPath = pdfService.generatePDF(req.body);

        res.status(200).send({ message: 'Data saved and PDF generated', pdfPath });
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

module.exports = router;
