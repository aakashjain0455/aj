const express = require('express');
const router = express.Router();
const partyController = require('../controllers/partyController');

router.get('/parties', partyController.getParties);
router.post('/parties', partyController.createParty);
router.put('/parties/:id', partyController.updateParty);
router.delete('/parties/:id', partyController.deleteParty);

module.exports = router;
