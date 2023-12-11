/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
const upload = require('express-fileupload');
const mongoose = require('mongoose');

// Import routes
const bodyParser = require('body-parser');
const router = require('./routes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Static files
app.use(express.static('public'));

// Middleware
app.use(cors());
app.use(upload());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/v1/', router);

// Testing
app.get('/', async (req, res) => {
  res.send('Working successfully!!');
});

// Error handler
app.use(errorHandler);

// Invalid route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Invalid route',
  });
});

// Database connection
async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('🛢 Database is connected successfully');
    app.listen(port, () => {
      console.log(`Application  listening on port ${port}...`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }
}
main();
