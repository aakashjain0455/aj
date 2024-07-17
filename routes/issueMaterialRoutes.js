const express = require('express');
const { getIssueMaterials, createIssueMaterial, updateIssueMaterial, deleteIssueMaterial } = require('../controllers/issueMaterialController');
const router = express.Router();

router.get('/', getIssueMaterials);
router.post('/', createIssueMaterial);
router.put('/:id', updateIssueMaterial);
router.delete('/:id', deleteIssueMaterial);

module.exports = router;
