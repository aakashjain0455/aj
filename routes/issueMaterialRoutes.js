const express = require('express');
const { getIssueMaterials, createIssueMaterial, updateIssueMaterial, deleteIssueMaterial } = require('../controllers/issueMaterialController');
const router = express.Router();

router.get('/issueMaterials', getIssueMaterials);
router.post('/issueMaterials', createIssueMaterial);
router.put('/issueMaterials/:id', updateIssueMaterial);
router.delete('/issueMaterials/:id', deleteIssueMaterial);

module.exports = router;
