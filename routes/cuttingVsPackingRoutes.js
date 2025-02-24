const express = require('express');
const router = express.Router();
const CuttingVsPacking = require('../models/CuttingVsPacking');  // ✅ Import the model
const cuttingVsPackingController = require('../controllers/cuttingVsPackingController');


router.get('/cuttingVsPacking', async (req, res) => {
    const { orderNumber } = req.query;
    
    try {
      let queryOptions = {};
      if (orderNumber) {
        queryOptions = { where: { orderNumber } };  // ✅ Only fetch data for this order
      }
  
      const records = await CuttingVsPacking.findAll(queryOptions);
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
router.post('/cuttingVsPacking', cuttingVsPackingController.createCuttingVsPacking);
router.put('/cuttingVsPacking/:id', cuttingVsPackingController.updateCuttingVsPacking);
router.delete('/cuttingVsPacking/:id', cuttingVsPackingController.deleteCuttingVsPacking);

module.exports = router;