const express = require('express');
const router = express.Router();
const usersRoute = require('./usersRoute');
const authRoute = require('./authRoute');
const stickerRoute = require('./stickerRoute');
const userStickersRoute = require('./userStickersRoute');

// Routes
const moduleRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: usersRoute,
  },
  {
    path: '/stickers',
    route: stickerRoute,
  },
  {
    path: '/userStickers',
    route: userStickersRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
