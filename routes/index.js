const express = require('express');
const router = express.Router();
const invoiceRoute = require('./invoiceRoute');
const authRoute = require('./authRoute');

// Routes
const moduleRoutes = [
  {
    path: '/invoice',
    route: invoiceRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
