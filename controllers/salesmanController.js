// controllers/salesmanController.js
const Salesman = require('../models/Salesman');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('photo');

exports.getAllSalesmen = async (req, res) => {
  try {
    const salesmen = await Salesman.findAll();
    res.json(salesmen);
  } catch (error) {
    console.error('Error fetching salesmen:', error);
    res.status(500).json({ error: 'Failed to fetch salesmen' });
  }
};

exports.createSalesman = async (req, res) => {
  try {
    const { salesmanName, description } = req.body;
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

    const salesmanCode = uuidv4();
    const salesman = await Salesman.create({ salesmanCode, salesmanName, description, photo: photoUrl });
    res.json(salesman);
  } catch (error) {
    console.error('Error creating salesman:', error);
    res.status(500).json({ error: 'Failed to create salesman' });
  }
};

exports.updateSalesman = async (req, res) => {
  try {
    const { id } = req.params;
    const { salesmanName, description } = req.body;
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

    const salesman = await Salesman.findByPk(id);
    if (salesman) {
      await salesman.update({ salesmanName, description, photo: photoUrl });
      res.json(salesman);
    } else {
      res.status(404).json({ error: 'Salesman not found' });
    }
  } catch (error) {
    console.error('Error updating salesman:', error);
    res.status(500).json({ error: 'Failed to update salesman' });
  }
};

exports.deleteSalesman = async (req, res) => {
  try {
    const { id } = req.params;
    const salesman = await Salesman.findByPk(id);
    if (salesman) {
      await salesman.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Salesman not found' });
    }
  } catch (error) {
    console.error('Error deleting salesman:', error);
    res.status(500).json({ error: 'Failed to delete salesman' });
  }
};
