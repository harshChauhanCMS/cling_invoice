const express = require('express');
const router = express.Router();
const invoiceRoute = require('./invoiceRoute');

// Routes
const moduleRoutes = [
  {
    path: '/invoice',
    route: invoiceRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
