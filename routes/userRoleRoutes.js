// routes/userRoleRoutes.js
const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');

router.get('/userRoles', userRoleController.getAllUserRoles);
router.post('/userRoles', userRoleController.createUserRole);
router.put('/userRoles/:id', userRoleController.updateUserRole);
router.delete('/userRoles/:id', userRoleController.deleteUserRole);

module.exports = router;
