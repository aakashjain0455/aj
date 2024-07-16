// routes/subCategoryRoutes.js
const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategoryController');

router.get('/subcategories', subCategoryController.getAllSubCategories);
router.post('/subcategories', subCategoryController.upload, subCategoryController.createSubCategory);
router.put('/subcategories/:id', subCategoryController.upload, subCategoryController.updateSubCategory);
router.delete('/subcategories/:id', subCategoryController.deleteSubCategory);

module.exports = router;
