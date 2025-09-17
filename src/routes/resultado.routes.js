const express = require('express');
const router = express.Router();
const resultadoController = require('../controllers/resultado.controller');

// Endpoints para Máscaras de Agua
router.get('/:id/mascara-agua/final', resultadoController.getFinalWaterMask);
router.get('/:id/mascara-agua/alta-confianza', resultadoController.getHighConfidenceWaterMask);
router.get('/:id/mascara-agua/jrc/estacional', resultadoController.getJRCSeasonalWaterMask);
router.get('/:id/mascara-agua/jrc/permanente', resultadoController.getJRCPermanentWaterMask);
router.get('/:id/mascara-agua/jrc/total', resultadoController.getJRCTotalWaterMask);

// Endpoints para Redes Hidrográficas
router.get('/:id/red-hidrografica/rios-principales', resultadoController.getPrincipalRiverNetwork);
router.get('/:id/red-hidrografica/rios-medianos', resultadoController.getMediumRiverNetwork);
router.get('/:id/red-hidrografica/rios-pequenos', resultadoController.getSmallRiverNetwork);
router.get('/:id/red-hidrografica/quebradas', resultadoController.getRavineNetwork);

module.exports = router;