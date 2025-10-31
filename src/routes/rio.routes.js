// src/routes/rio.routes.js
const express = require('express'); 
const router = express.Router(); 
const rioController = require('../controllers/rio.controller'); 
const verifyToken = require('../middleware/auth.middleware'); // <-- Importar

// Rutas Públicas (Información de consulta general)
router.get('/chipalo', rioController.getChipaloInfo); 
router.get('/combeima', rioController.getCombeimaInfo); 
router.get('/combeima/estadisticas', rioController.getCombeimaStatistics); 

// Rutas Protegidas (Acciones que modifican o ejecutan procesos)
router.post('/combeima/analisis', verifyToken, rioController.runCombeimaAnalysis); 

module.exports = router;