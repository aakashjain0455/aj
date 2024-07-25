const express = require('express');
const router = express.Router();
const materialReceiptController = require('../controllers/materialReceiptController');

router.get('/materialReceipts', materialReceiptController.getMaterialReceipts);
router.post('/materialReceipts', materialReceiptController.createMaterialReceipt);
router.put('/materialReceipts/:id', materialReceiptController.updateMaterialReceipt);
router.delete('/materialReceipts/:id', materialReceiptController.deleteMaterialReceipt);

module.exports = router;
