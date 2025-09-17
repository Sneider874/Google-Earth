const express = require('express');
const router = express.Router();
const rioController = require('../controllers/rio.controller');

// Endpoints para ríos
router.get('/chipalo', rioController.getChipaloInfo);
router.get('/combeima', rioController.getCombeimaInfo);
router.get('/combeima/estadisticas', rioController.getCombeimaStatistics);
router.post('/combeima/analisis', rioController.runCombeimaAnalysis);

module.exports = router;