// src/routes/reporte.routes.js
const express = require('express'); 
const router = express.Router(); 
const reporteController = require('../controllers/reporte.controller'); 
const verifyToken = require('../middleware/auth.middleware'); // <-- Importar

// Rutas Protegidas
router.post('/generar', verifyToken, reporteController.generateReport); 
router.get('/:id/areas', verifyToken, reporteController.getDetailedAreas); 
router.delete('/:id', verifyToken, reporteController.deleteReport); 

module.exports = router;