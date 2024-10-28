// routes/grommetRoutes.js
const express = require('express');
const router = express.Router();
const grommetController = require('../controllers/grommetController');

router.get('/grommets', grommetController.getAllGrommets);
router.post('/grommets', grommetController.upload, grommetController.createGrommet);
router.put('/grommets/:id', grommetController.upload, grommetController.updateGrommet);
router.delete('/grommets/:id', grommetController.deleteGrommet);

module.exports = router;
