const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

// Endpoint para la página de inicio
router.get('/', homeController.getHomePage);

module.exports = router;