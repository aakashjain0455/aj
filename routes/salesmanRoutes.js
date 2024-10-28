// routes/salesmanRoutes.js
const express = require('express');
const router = express.Router();
const salesmanController = require('../controllers/salesmanController');

router.get('/salesmen', salesmanController.getAllSalesmen);
router.post('/salesmen', salesmanController.upload, salesmanController.createSalesman);
router.put('/salesmen/:id', salesmanController.upload, salesmanController.updateSalesman);
router.delete('/salesmen/:id', salesmanController.deleteSalesman);

module.exports = router;
