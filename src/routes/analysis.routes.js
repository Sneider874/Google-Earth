const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysis.controller');

// Endpoints para Análisis
router.post('/run/:id', analysisController.runNewAnalysis);
router.delete('/:id', analysisController.deleteAnalysis);
router.get('/:id/indices', analysisController.getAnalysisIndices);
router.get('/:id/sensores', analysisController.getUsedSensors);
router.put('/:id', analysisController.updateExistingAnalysis);

module.exports = router;