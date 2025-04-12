const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/users/signin', userController.signIn);
router.post('/users/change-password', userController.changePassword);  // New route

router.post('/users/logoutAll', userController.logoutAllUsers);
router.get('/users/sessionVersion', userController.getSessionVersion);

module.exports = router;
