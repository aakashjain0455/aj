const express = require('express');
const router = express.Router();
const issueMaterialController = require('../controllers/issueMaterialController'); // Correct path

router.get('/materialIssues', issueMaterialController.getMaterialIssues);
router.post('/materialIssues', issueMaterialController.createMaterialIssue);
router.put('/materialIssues/:id', issueMaterialController.updateMaterialIssue);
router.delete('/materialIssues/:id', issueMaterialController.deleteMaterialIssue);

module.exports = router;
