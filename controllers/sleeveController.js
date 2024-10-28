// controllers/sleeveController.js
const Sleeve = require('../models/Sleeve');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllSleeves = async (req, res) => {
  try {
    const sleeves = await Sleeve.findAll();
    res.json(sleeves);
  } catch (error) {
    console.error('Error fetching sleeves:', error);
    res.status(500).json({ error: 'Failed to fetch sleeves' });
  }
};

exports.createSleeve = async (req, res) => {
  try {
    const { sleeveName, description } = req.body;
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

    const sleeveCode = uuidv4();
    const sleeve = await Sleeve.create({ sleeveCode, sleeveName, description, photo: photoUrl });
    res.json(sleeve);
  } catch (error) {
    console.error('Error creating sleeve:', error);
    res.status(500).json({ error: 'Failed to create sleeve' });
  }
};

exports.updateSleeve = async (req, res) => {
  try {
    const { id } = req.params;
    const { sleeveName, description } = req.body;
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

    const sleeve = await Sleeve.findByPk(id);
    if (sleeve) {
      await sleeve.update({ sleeveName, description, photo: photoUrl });
      res.json(sleeve);
    } else {
      res.status(404).json({ error: 'Sleeve not found' });
    }
  } catch (error) {
    console.error('Error updating sleeve:', error);
    res.status(500).json({ error: 'Failed to update sleeve' });
  }
};

exports.deleteSleeve = async (req, res) => {
  try {
    const { id } = req.params;
    const sleeve = await Sleeve.findByPk(id);
    if (sleeve) {
      await sleeve.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Sleeve not found' });
    }
  } catch (error) {
    console.error('Error deleting sleeve:', error);
    res.status(500).json({ error: 'Failed to delete sleeve' });
  }
};
