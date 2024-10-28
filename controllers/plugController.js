// controllers/plugController.js
const Plug = require('../models/Plug');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllPlugs = async (req, res) => {
  try {
    const plugs = await Plug.findAll();
    res.json(plugs);
  } catch (error) {
    console.error('Error fetching plugs:', error);
    res.status(500).json({ error: 'Failed to fetch plugs' });
  }
};

exports.createPlug = async (req, res) => {
  try {
    const { plugName, description } = req.body;
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

    const plugCode = uuidv4();
    const plug = await Plug.create({ plugCode, plugName, description, photo: photoUrl });
    res.json(plug);
  } catch (error) {
    console.error('Error creating plug:', error);
    res.status(500).json({ error: 'Failed to create plug' });
  }
};

exports.updatePlug = async (req, res) => {
  try {
    const { id } = req.params;
    const { plugName, description } = req.body;
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

    const plug = await Plug.findByPk(id);
    if (plug) {
      await plug.update({ plugName, description, photo: photoUrl });
      res.json(plug);
    } else {
      res.status(404).json({ error: 'Plug not found' });
    }
  } catch (error) {
    console.error('Error updating plug:', error);
    res.status(500).json({ error: 'Failed to update plug' });
  }
};

exports.deletePlug = async (req, res) => {
  try {
    const { id } = req.params;
    const plug = await Plug.findByPk(id);
    if (plug) {
      await plug.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Plug not found' });
    }
  } catch (error) {
    console.error('Error deleting plug:', error);
    res.status(500).json({ error: 'Failed to delete plug' });
  }
};
