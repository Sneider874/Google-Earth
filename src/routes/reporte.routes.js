const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');

// Endpoints para Reportes
router.post('/generar', reporteController.generateReport);
router.get('/:id/areas', reporteController.getDetailedAreas);
router.delete('/:id', reporteController.deleteReport);

module.exports = router;