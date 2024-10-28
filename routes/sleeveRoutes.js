// routes/sleeveRoutes.js
const express = require('express');
const router = express.Router();
const sleeveController = require('../controllers/sleeveController');

router.get('/sleeves', sleeveController.getAllSleeves);
router.post('/sleeves', sleeveController.upload, sleeveController.createSleeve);
router.put('/sleeves/:id', sleeveController.upload, sleeveController.updateSleeve);
router.delete('/sleeves/:id', sleeveController.deleteSleeve);

module.exports = router;
