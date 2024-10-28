// controllers/pinController.js
const Pin = require('../models/Pin');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllPins = async (req, res) => {
  try {
    const pins = await Pin.findAll();
    res.json(pins);
  } catch (error) {
    console.error('Error fetching pins:', error);
    res.status(500).json({ error: 'Failed to fetch pins' });
  }
};

exports.createPin = async (req, res) => {
  try {
    const { pinName, description } = req.body;
    let photoUrl = null;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      photoUrl = result.secure_url;
    }

    const pinCode = uuidv4();
    const pin = await Pin.create({ pinCode, pinName, description, photo: photoUrl });
    res.json(pin);
  } catch (error) {
    console.error('Error creating pin:', error);
    res.status(500).json({ error: 'Failed to create pin' });
  }
};

exports.updatePin = async (req, res) => {
  try {
    const { id } = req.params;
    const { pinName, description } = req.body;
    let photoUrl = null;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      photoUrl = result.secure_url;
    }

    const pin = await Pin.findByPk(id);
    if (pin) {
      await pin.update({ pinName, description, photo: photoUrl });
      res.json(pin);
    } else {
      res.status(404).json({ error: 'Pin not found' });
    }
  } catch (error) {
    console.error('Error updating pin:', error);
    res.status(500).json({ error: 'Failed to update pin' });
  }
};

exports.deletePin = async (req, res) => {
  try {
    const { id } = req.params;
    const pin = await Pin.findByPk(id);
    if (pin) {
      await pin.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Pin not found' });
    }
  } catch (error) {
    console.error('Error deleting pin:', error);
    res.status(500).json({ error: 'Failed to delete pin' });
  }
};
