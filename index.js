/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const upload = require('express-fileupload');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cron = require('node-cron');

// Import routes
const bodyParser = require('body-parser');
const router = require('./routes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/authMiddleware');
const swaggerOptions = require('./utils/swagger');
const sendReminder = require('./controllers/cron/sendReminder');

// Static files
app.use(express.static('public'));

// Middleware
app.use(cors());
app.use(upload());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Auth middleware
app.all('/api/v1/*', (req, res, next) => {
  const publicRoutes = [
    'auth/login',
    'auth/verifyToken',
    // 'stickers/addSticker',
    'users/notifyUser',
    'stickers/generate',
    'stickers/getSticker',
    'request/addRequest',
  ];
  const path = req.path.split('/v1/')[1];
  if (publicRoutes.includes(path)) {
    return next();
  } else {
    return authMiddleware.authenticateToken(req, res, next);
  }
});

// Routes
app.use('/api/v1/', router);

// Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

cron.schedule('0 10 * * *', () => {
  sendReminder();
});
