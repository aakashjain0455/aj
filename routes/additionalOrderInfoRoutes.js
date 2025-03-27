const express = require('express');
const router = express.Router();
const controller = require('../controllers/additionalOrderInfoController');

router.get('/additional-info', controller.getAdditionalInfo);
router.post('/additional-info', controller.saveAdditionalInfo);
router.delete('/additional-info/:orderNumber', controller.deleteAdditionalInfo);

module.exports = router;