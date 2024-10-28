// routes/wireSpecificationRoutes.js
const express = require('express');
const router = express.Router();
const wireSpecificationController = require('../controllers/wireSpecificationController');

router.get('/wire-specifications', wireSpecificationController.getAllWireSpecifications);
router.post('/wire-specifications', wireSpecificationController.upload, wireSpecificationController.createWireSpecification);
router.put('/wire-specifications/:id', wireSpecificationController.upload, wireSpecificationController.updateWireSpecification);
router.delete('/wire-specifications/:id', wireSpecificationController.deleteWireSpecification);

module.exports = router;
