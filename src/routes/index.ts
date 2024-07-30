import express, { Express } from "express";
const authRoute = require('./auth.route.ts');
const router = express.Router();

const defaultRoutes = [
    {
      path: '/auth',
      route: authRoute,
    },

  ];
  
  defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
  module.exports = router;