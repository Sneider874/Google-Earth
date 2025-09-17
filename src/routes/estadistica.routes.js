const express = require('express');
const router = express.Router();
const estadisticaController = require('../controllers/estadistica.controller');

// Endpoint para Estadísticas
router.get('/:id', estadisticaController.getSummary);

module.exports = router;