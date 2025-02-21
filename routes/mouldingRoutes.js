const express = require('express');
const router = express.Router();
const mouldingController = require('../controllers/mouldingController');

router.get('/moulding/:orderNumber', mouldingController.getMouldingDataByOrder);
router.post('/moulding', mouldingController.saveMouldingData);
router.delete('/moulding/:orderNumber', mouldingController.deleteMouldingByOrder);
router.get('/moulding', async (req, res) => {
    res.status(200).json({ message: "Moulding API is working! Add orderNumber to get data." });
  });
  

module.exports = router;
