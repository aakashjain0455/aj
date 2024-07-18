const express = require('express');
const router = express.Router();
const benchmarkController = require('../controllers/benchmarkController');

router.get('/benchmarks', benchmarkController.getBenchmarks);
router.post('/benchmarks', benchmarkController.createOrUpdateBenchmark);
router.put('/benchmarks/:id', benchmarkController.updateBenchmark);
router.delete('/benchmarks/:id', benchmarkController.deleteBenchmark);

module.exports = router;
