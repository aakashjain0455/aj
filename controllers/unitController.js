// controllers/unitController.js
const Unit = require('../models/Unit');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllUnits = async (req, res) => {
  try {
    const units = await Unit.findAll();
    res.json(units);
  } catch (error) {
    console.error('Error fetching units:', error);
    res.status(500).json({ error: 'Failed to fetch units' });
  }
};

exports.createUnit = async (req, res) => {
  try {
    const { unitName, description } = req.body;
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

    const unitCode = uuidv4(); // Generate a unique unitCode

    const unit = await Unit.create({ unitCode, unitName, description, photo: photoUrl });
    res.json(unit);
  } catch (error) {
    console.error('Error creating unit:', error);
    res.status(500).json({ error: 'Failed to create unit', details: error.message });
  }
};

exports.updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const { unitName, description } = req.body;
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

    const unit = await Unit.findByPk(id);
    if (unit) {
      await unit.update({ unitCode: unit.unitCode, unitName, description, photo: photoUrl });
      res.json(unit);
    } else {
      res.status(404).json({ error: 'Unit not found' });
    }
  } catch (error) {
    console.error('Error updating unit:', error);
    res.status(500).json({ error: 'Failed to update unit', details: error.message });
  }
};

exports.deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const unit = await Unit.findByPk(id);
    if (unit) {
      await unit.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Unit not found' });
    }
  } catch (error) {
    console.error('Error deleting unit:', error);
    res.status(500).json({ error: 'Failed to delete unit', details: error.message });
  }
};
