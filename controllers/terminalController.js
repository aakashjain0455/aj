// controllers/terminalController.js
const Terminal = require('../models/Terminal');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllTerminals = async (req, res) => {
  try {
    const terminals = await Terminal.findAll();
    res.json(terminals);
  } catch (error) {
    console.error('Error fetching terminals:', error);
    res.status(500).json({ error: 'Failed to fetch terminals' });
  }
};

exports.createTerminal = async (req, res) => {
  try {
    const { terminalName, description } = req.body;
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

    const terminalCode = uuidv4();
    const terminal = await Terminal.create({ terminalCode, terminalName, description, photo: photoUrl });
    res.json(terminal);
  } catch (error) {
    console.error('Error creating terminal:', error);
    res.status(500).json({ error: 'Failed to create terminal' });
  }
};

exports.updateTerminal = async (req, res) => {
  try {
    const { id } = req.params;
    const { terminalName, description } = req.body;
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

    const terminal = await Terminal.findByPk(id);
    if (terminal) {
      await terminal.update({ terminalName, description, photo: photoUrl });
      res.json(terminal);
    } else {
      res.status(404).json({ error: 'Terminal not found' });
    }
  } catch (error) {
    console.error('Error updating terminal:', error);
    res.status(500).json({ error: 'Failed to update terminal' });
  }
};

exports.deleteTerminal = async (req, res) => {
  try {
    const { id } = req.params;
    const terminal = await Terminal.findByPk(id);
    if (terminal) {
      await terminal.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Terminal not found' });
    }
  } catch (error) {
    console.error('Error deleting terminal:', error);
    res.status(500).json({ error: 'Failed to delete terminal' });
  }
};
