// src/routes/resultado.routes.js
const express = require('express'); 
const router = express.Router(); 
const resultadoController = require('../controllers/resultado.controller'); 
const verifyToken = require('../middleware/auth.middleware'); // <-- Importar

// Rutas Protegidas
router.get('/:id/mascara-agua/final', verifyToken, resultadoController.getFinalWaterMask); 
router.get('/:id/mascara-agua/alta-confianza', verifyToken, resultadoController.getHighConfidenceWaterMask); 
router.get('/:id/mascara-agua/jrc/estacional', verifyToken, resultadoController.getJRCSeasonalWaterMask); 
router.get('/:id/mascara-agua/jrc/permanente', verifyToken, resultadoController.getJRCPermanentWaterMask); 
router.get('/:id/mascara-agua/jrc/total', verifyToken, resultadoController.getJRCTotalWaterMask); 
router.get('/:id/red-hidrografica/rios-principales', verifyToken, resultadoController.getPrincipalRiverNetwork); 
router.get('/:id/red-hidrografica/rios-medianos', verifyToken, resultadoController.getMediumRiverNetwork); 
router.get('/:id/red-hidrografica/rios-pequenos', verifyToken, resultadoController.getSmallRiverNetwork); 
router.get('/:id/red-hidrografica/quebradas', verifyToken, resultadoController.getRavineNetwork); 

module.exports = router;