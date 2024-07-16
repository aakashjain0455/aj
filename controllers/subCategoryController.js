// controllers/subCategoryController.js
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll({ include: Category });
    res.json(subCategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
};

exports.createSubCategory = async (req, res) => {
  try {
    const { subCategoryName, description, categoryId } = req.body;
    let photoUrl = null;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      photoUrl = result.secure_url;
    }

    const subCategoryCode = uuidv4(); // Generate a unique subCategoryCode

    const subCategory = await SubCategory.create({ subCategoryCode, subCategoryName, description, photo: photoUrl, categoryId });
    res.json(subCategory);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({ error: 'Failed to create subcategory', details: error.message });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { subCategoryName, description, categoryId } = req.body;
    let photoUrl = null;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      photoUrl = result.secure_url;
    }

    const subCategory = await SubCategory.findByPk(id);
    if (subCategory) {
      await subCategory.update({ subCategoryCode: subCategory.subCategoryCode, subCategoryName, description, photo: photoUrl, categoryId });
      res.json(subCategory);
    } else {
      res.status(404).json({ error: 'SubCategory not found' });
    }
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({ error: 'Failed to update subcategory', details: error.message });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findByPk(id);
    if (subCategory) {
      await subCategory.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'SubCategory not found' });
    }
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ error: 'Failed to delete subcategory', details: error.message });
  }
};
