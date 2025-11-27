

const express = require('express'); 
const router = express.Router(); 
const resultadoController = require('../controllers/resultado.controller'); 


const { verifyToken, checkRole } = require('../middleware/auth.middleware'); 


const VISUAL_ROLES = [1, 2];


router.get('/:id/mascara-agua/final', 
    verifyToken, 
    checkRole(VISUAL_ROLES),
    resultadoController.getFinalWaterMask
); 


router.get('/:id/mascara-agua/alta-confianza', 
    verifyToken, 
    checkRole(VISUAL_ROLES),
    resultadoController.getHighConfidenceWaterMask
); 


router.get('/:id/mascara-agua/jrc/estacional', 
    verifyToken, 
    checkRole(VISUAL_ROLES),
    resultadoController.getJRCSeasonalWaterMask
); 


router.get('/:id/mascara-agua/jrc/permanente', 
    verifyToken, 
    checkRole(VISUAL_ROLES),
    resultadoController.getJRCPermanentWaterMask
); 


router.get('/:id/mascara-agua/jrc/total', 
    verifyToken, 
    checkRole(VISUAL_ROLES),
    resultadoController.getJRCTotalWaterMask
); 


router.get('/:id/red-hidrografica/rios-principales', 
    verifyToken, 
    checkRole(VISUAL_ROLES),
    resultadoController.getPrincipalRiverNetwork
); 


router.get('/:id/red-hidrografica/rios-medianos', 
    verifyToken, 
    checkRole(VISUAL_ROLES),
    resultadoController.getMediumRiverNetwork
); 


router.get('/:id/red-hidrografica/rios-pequenos', 
    verifyToken, 
    checkRole(VISUAL_ROLES),
    resultadoController.getSmallRiverNetwork
); 


router.get('/:id/red-hidrografica/quebradas', 
    verifyToken, 
    checkRole(VISUAL_ROLES),
    resultadoController.getRavineNetwork
); 

module.exports = router;