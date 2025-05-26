/* eslint-disable no-console */
/* eslint-disable max-len */

const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();
const app = express();
const port = 8000;

// const upload = require('express-fileupload');
const mongoose = require('mongoose');

// Import routes
const bodyParser = require('body-parser');
const router = require('./routes');

// Import middleware
const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

// Static files
app.use(express.static('public'));

// Middleware
app.use(cors());
// app.use(upload());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
// app.use(express.json());

app.all('/api/v1/*', (req, res, next) => {
  const publicRoutes = ['auth/login', 'auth/register'];
  const path = req.path.split('/v1/')[1];
  console.log('path', path, req.method);

  if (publicRoutes.includes(path)) {
    return next();
  } else {
    return authMiddleware.authenticateToken(req, res, next);
  }
});

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
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://clingInvoiceAdmin:B3yI05PtnEKsz7wB@cluster0.nozpx5i.mongodb.net/cling_invoices?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      }
    );
    console.log('🛢 Database is connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Connect to database before starting the server
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, async () => {
    await connectDB();
    console.log(`Application listening on port ${port}...`);
  });
}

// Export serverless handler
module.exports.handler = async (event, context) => {
  // Connect to database before handling the request
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }
  return serverless(app)(event, context);
};
