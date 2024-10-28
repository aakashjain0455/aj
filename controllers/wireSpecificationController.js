// controllers/wireSpecificationController.js
const WireSpecification = require('../models/WireSpecification');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('document');

exports.getAllWireSpecifications = async (req, res) => {
  try {
    const wireSpecifications = await WireSpecification.findAll();
    res.json(wireSpecifications);
  } catch (error) {
    console.error('Error fetching wire specifications:', error);
    res.status(500).json({ error: 'Failed to fetch wire specifications' });
  }
};

exports.createWireSpecification = async (req, res) => {
  try {
    const { wireSpecificationName, description } = req.body;
    let documentUrl = null;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      documentUrl = result.secure_url;
    }

    const wireSpecificationCode = uuidv4();
    const wireSpecification = await WireSpecification.create({ wireSpecificationCode, wireSpecificationName, description, document: documentUrl });
    res.json(wireSpecification);
  } catch (error) {
    console.error('Error creating wire specification:', error);
    res.status(500).json({ error: 'Failed to create wire specification' });
  }
};

exports.updateWireSpecification = async (req, res) => {
  try {
    const { id } = req.params;
    const { wireSpecificationName, description } = req.body;
    let documentUrl = null;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      documentUrl = result.secure_url;
    }

    const wireSpecification = await WireSpecification.findByPk(id);
    if (wireSpecification) {
      await wireSpecification.update({ wireSpecificationName, description, document: documentUrl });
      res.json(wireSpecification);
    } else {
      res.status(404).json({ error: 'Wire specification not found' });
    }
  } catch (error) {
    console.error('Error updating wire specification:', error);
    res.status(500).json({ error: 'Failed to update wire specification' });
  }
};

exports.deleteWireSpecification = async (req, res) => {
  try {
    const { id } = req.params;
    const wireSpecification = await WireSpecification.findByPk(id);
    if (wireSpecification) {
      await wireSpecification.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Wire specification not found' });
    }
  } catch (error) {
    console.error('Error deleting wire specification:', error);
    res.status(500).json({ error: 'Failed to delete wire specification' });
  }
};
