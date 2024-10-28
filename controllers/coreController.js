// controllers/coreController.js
const Core = require('../models/Core');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllCores = async (req, res) => {
  try {
    const cores = await Core.findAll();
    res.json(cores);
  } catch (error) {
    console.error('Error fetching cores:', error);
    res.status(500).json({ error: 'Failed to fetch cores' });
  }
};

exports.createCore = async (req, res) => {
  try {
    const { coreName, description } = req.body;
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

    const coreCode = uuidv4();
    const core = await Core.create({ coreCode, coreName, description, photo: photoUrl });
    res.json(core);
  } catch (error) {
    console.error('Error creating core:', error);
    res.status(500).json({ error: 'Failed to create core' });
  }
};

exports.updateCore = async (req, res) => {
  try {
    const { id } = req.params;
    const { coreName, description } = req.body;
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

    const core = await Core.findByPk(id);
    if (core) {
      await core.update({ coreName, description, photo: photoUrl });
      res.json(core);
    } else {
      res.status(404).json({ error: 'Core not found' });
    }
  } catch (error) {
    console.error('Error updating core:', error);
    res.status(500).json({ error: 'Failed to update core' });
  }
};

exports.deleteCore = async (req, res) => {
  try {
    const { id } = req.params;
    const core = await Core.findByPk(id);
    if (core) {
      await core.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Core not found' });
    }
  } catch (error) {
    console.error('Error deleting core:', error);
    res.status(500).json({ error: 'Failed to delete core' });
  }
};
