// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const transportRoutes = require('./routes/transportRoutes');
const categoryRoutes = require('./routes/categoryRoutes');  // Added line

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', transportRoutes);
app.use('/api', categoryRoutes);  // Added line

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
