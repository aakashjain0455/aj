// routes/creditLimitRoutes.js
const express = require('express');
const router = express.Router();
const creditLimitController = require('../controllers/creditLimitController');

router.get('/', creditLimitController.getAllCreditLimits); // GET /api/credit-limits
router.post('/', creditLimitController.createCreditLimit); // POST /api/credit-limits
router.put('/', creditLimitController.updateCreditLimit); // PUT /api/credit-limits
router.delete('/:orderNumber', creditLimitController.deleteCreditLimit); // DELETE /api/credit-limits/:orderNumber

module.exports = router;
