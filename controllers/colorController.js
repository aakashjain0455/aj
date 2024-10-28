// controllers/colorController.js
const Color = require('../models/Color');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.json(colors);
  } catch (error) {
    console.error('Error fetching colors:', error);
    res.status(500).json({ error: 'Failed to fetch colors' });
  }
};

exports.createColor = async (req, res) => {
  try {
    const { colorName, description } = req.body;
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

    const colorCode = uuidv4();
    const color = await Color.create({ colorCode, colorName, description, photo: photoUrl });
    res.json(color);
  } catch (error) {
    console.error('Error creating color:', error);
    res.status(500).json({ error: 'Failed to create color' });
  }
};

exports.updateColor = async (req, res) => {
  try {
    const { id } = req.params;
    const { colorName, description } = req.body;
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

    const color = await Color.findByPk(id);
    if (color) {
      await color.update({ colorName, description, photo: photoUrl });
      res.json(color);
    } else {
      res.status(404).json({ error: 'Color not found' });
    }
  } catch (error) {
    console.error('Error updating color:', error);
    res.status(500).json({ error: 'Failed to update color' });
  }
};

exports.deleteColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findByPk(id);
    if (color) {
      await color.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Color not found' });
    }
  } catch (error) {
    console.error('Error deleting color:', error);
    res.status(500).json({ error: 'Failed to delete color' });
  }
};
