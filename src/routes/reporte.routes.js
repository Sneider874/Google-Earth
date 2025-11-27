

const express = require('express'); 
const router = express.Router(); 
const reporteController = require('../controllers/reporte.controller'); 


const { verifyToken, checkRole } = require('../middleware/auth.middleware'); 



router.post('/generar', 
    verifyToken, 
    checkRole([1]), 
    reporteController.generateReport 
); 


router.get('/:id/areas', 
    verifyToken, 
    checkRole([1, 2]), 
    reporteController.getDetailedAreas
); 


router.delete('/:id', 
    verifyToken, 
    checkRole([1]), 
    reporteController.deleteReport
); 

module.exports = router;