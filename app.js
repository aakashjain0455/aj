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
const userRoutes = require('./routes/userRoutes'); // Add this line
const userRoleRoutes = require('./routes/userRoleRoutes'); // Add this line
const path = require('path');
const fs = require('fs');
const User = require('./models/User'); // Add this line
const UserRole = require('./models/UserRole'); // Add this line

const app = express();
app.use(bodyParser.json());
app.use(cors());
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
app.use('/api', userRoutes); // Add this line
app.use('/api', userRoleRoutes); // Add this line

const PORT = process.env.PORT || 5000;

// Sync database and create default user if not exists
sequelize.sync().then(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Create default user
  const defaultUser = await User.findOne({ where: { username: 'super' } });
  if (!defaultUser) {
    await User.create({
      username: 'super',
      password: '12345',
      groupName: 'Admin',
      activeStatus: 'active'
    });
    console.log('Default user created');
  }
}).catch(err => {
  console.error('Failed to sync database:', err);
});

module.exports = app;
