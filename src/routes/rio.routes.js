

const express = require('express'); 
const router = express.Router(); 
const rioController = require('../controllers/rio.controller'); 


const { verifyToken, checkRole } = require('../middleware/auth.middleware'); 




router.get('/chipalo', rioController.getChipaloInfo); 


router.get('/combeima', rioController.getCombeimaInfo); 


router.get('/combeima/estadisticas', rioController.getCombeimaStatistics); 



router.post('/combeima/analisis', 
    verifyToken, 
    checkRole([1]), 
    rioController.runCombeimaAnalysis
); 

module.exports = router;