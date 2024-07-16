// controllers/itemController.js
const Item = require('../models/Item');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.fields([
  { name: 'photo1', maxCount: 1 },
  { name: 'photo2', maxCount: 1 },
]);

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { itemCode, itemName, unit, standardPacking, category, subCategory, mrp, gst, selectedData } = req.body;
    let photo1Url = null;
    let photo2Url = null;

    if (req.files['photo1']) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });
        streamifier.createReadStream(req.files['photo1'][0].buffer).pipe(uploadStream);
      });
      photo1Url = result.secure_url;
    }

    if (req.files['photo2']) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });
        streamifier.createReadStream(req.files['photo2'][0].buffer).pipe(uploadStream);
      });
      photo2Url = result.secure_url;
    }

    const item = await Item.create({ itemCode, itemName, unit, standardPacking, category, subCategory, mrp, gst, selectedData, photo1: photo1Url, photo2: photo2Url });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item', details: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemCode, itemName, unit, standardPacking, category, subCategory, mrp, gst, selectedData } = req.body;
    let photo1Url = null;
    let photo2Url = null;

    if (req.files['photo1']) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });
        streamifier.createReadStream(req.files['photo1'][0].buffer).pipe(uploadStream);
      });
      photo1Url = result.secure_url;
    }

    if (req.files['photo2']) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });
        streamifier.createReadStream(req.files['photo2'][0].buffer).pipe(uploadStream);
      });
      photo2Url = result.secure_url;
    }

    const item = await Item.findByPk(id);
    if (item) {
      await item.update({ itemCode, itemName, unit, standardPacking, category, subCategory, mrp, gst, selectedData, photo1: photo1Url, photo2: photo2Url });
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item', details: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (item) {
      await item.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item', details: error.message });
  }
};
