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
const materialReceiptRoutes = require('./routes/materialReceiptRoutes'); // Add this line
const path = require('path');
const fs = require('fs');

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
app.use('/api', materialReceiptRoutes); // Add this line

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});

module.exports = app;
