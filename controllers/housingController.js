// controllers/housingController.js
const Housing = require('../models/Housing');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllHousing = async (req, res) => {
  try {
    const housingData = await Housing.findAll();
    res.json(housingData);
  } catch (error) {
    console.error('Error fetching housing data:', error);
    res.status(500).json({ error: 'Failed to fetch housing data' });
  }
};

exports.createHousing = async (req, res) => {
  try {
    const { housingName, description } = req.body;
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

    const housingCode = uuidv4();
    const housing = await Housing.create({ housingCode, housingName, description, photo: photoUrl });
    res.json(housing);
  } catch (error) {
    console.error('Error creating housing entry:', error);
    res.status(500).json({ error: 'Failed to create housing entry' });
  }
};

exports.updateHousing = async (req, res) => {
  try {
    const { id } = req.params;
    const { housingName, description } = req.body;
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

    const housing = await Housing.findByPk(id);
    if (housing) {
      await housing.update({ housingName, description, photo: photoUrl });
      res.json(housing);
    } else {
      res.status(404).json({ error: 'Housing entry not found' });
    }
  } catch (error) {
    console.error('Error updating housing entry:', error);
    res.status(500).json({ error: 'Failed to update housing entry' });
  }
};

exports.deleteHousing = async (req, res) => {
  try {
    const { id } = req.params;
    const housing = await Housing.findByPk(id);
    if (housing) {
      await housing.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Housing entry not found' });
    }
  } catch (error) {
    console.error('Error deleting housing entry:', error);
    res.status(500).json({ error: 'Failed to delete housing entry' });
  }
};
