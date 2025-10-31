// src/routes/analysis.routes.js
const express = require('express'); 
const router = express.Router(); 
const analysisController = require('../controllers/analysis.controller'); 
const verifyToken = require('../middleware/auth.middleware'); // <-- Importar

// Rutas Protegidas
router.post('/run/:id', verifyToken, analysisController.runNewAnalysis); 
router.delete('/:id', verifyToken, analysisController.deleteAnalysis); 
router.get('/:id/indices', verifyToken, analysisController.getAnalysisIndices); 
router.get('/:id/sensores', verifyToken, analysisController.getUsedSensors); 
router.put('/:id', verifyToken, analysisController.updateExistingAnalysis); 

module.exports = router;