const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const transportRoutes = require('./routes/transportRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const unitRoutes = require('./routes/unitRoutes');
const itemRoutes = require('./routes/itemRoutes');
const partyRoutes = require('./routes/partyRoutes');
const materialReceiptRoutes = require('./routes/materialReceiptRoutes');
const issueMaterialRoutes = require('./routes/issueMaterialRoutes');
const benchmarkRoutes = require('./routes/benchmarkRoutes');
const userRoutes = require('./routes/userRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');
const path = require('path');
const fs = require('fs');
const User = require('./models/User');
const UserRole = require('./models/UserRole');

const app = express();
app.use(bodyParser.json());

// Updated CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://vermillion-zuccutto-56a97a.netlify.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use('/api', transportRoutes);
app.use('/api', categoryRoutes);
app.use('/api', subCategoryRoutes);
app.use('/api', unitRoutes);
app.use('/api', itemRoutes);
app.use('/api', partyRoutes);
app.use('/api', materialReceiptRoutes);
app.use('/api', issueMaterialRoutes);
app.use('/api', benchmarkRoutes);
app.use('/api', userRoutes);
app.use('/api', userRoleRoutes);

const PORT = process.env.PORT || 5000;

// Sync database and create default user if not exists
sequelize.sync().then(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Create default admin user
  const defaultUser = await User.findOne({ where: { username: 'admin' } });
  if (!defaultUser) {
    await User.create({
      username: 'admin',
      password: 'admin123',
      groupName: 'Admin',
      activeStatus: 'active'
    });
    console.log('Default admin user created');
  }
}).catch(err => {
  console.error('Failed to sync database:', err);
});

module.exports = app;
