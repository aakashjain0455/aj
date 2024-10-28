// controllers/grommetController.js
const Grommet = require('../models/Grommet');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllGrommets = async (req, res) => {
  try {
    const grommets = await Grommet.findAll();
    res.json(grommets);
  } catch (error) {
    console.error('Error fetching grommets:', error);
    res.status(500).json({ error: 'Failed to fetch grommets' });
  }
};

exports.createGrommet = async (req, res) => {
  try {
    const { grommetName, description } = req.body;
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

    const grommetCode = uuidv4();
    const grommet = await Grommet.create({ grommetCode, grommetName, description, photo: photoUrl });
    res.json(grommet);
  } catch (error) {
    console.error('Error creating grommet:', error);
    res.status(500).json({ error: 'Failed to create grommet' });
  }
};

exports.updateGrommet = async (req, res) => {
  try {
    const { id } = req.params;
    const { grommetName, description } = req.body;
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

    const grommet = await Grommet.findByPk(id);
    if (grommet) {
      await grommet.update({ grommetName, description, photo: photoUrl });
      res.json(grommet);
    } else {
      res.status(404).json({ error: 'Grommet not found' });
    }
  } catch (error) {
    console.error('Error updating grommet:', error);
    res.status(500).json({ error: 'Failed to update grommet' });
  }
};

exports.deleteGrommet = async (req, res) => {
  try {
    const { id } = req.params;
    const grommet = await Grommet.findByPk(id);
    if (grommet) {
      await grommet.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Grommet not found' });
    }
  } catch (error) {
    console.error('Error deleting grommet:', error);
    res.status(500).json({ error: 'Failed to delete grommet' });
  }
};
