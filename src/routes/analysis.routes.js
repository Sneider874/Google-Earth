const express = require('express'); 
const router = express.Router(); 
const analysisController = require('../controllers/analysis.controller'); 

const { verifyToken, checkRole } = require('../middleware/auth.middleware'); 

// Obtener todos los análisis
router.get('/', 
    verifyToken, 
    checkRole([1, 2]), 
    analysisController.getAllAnalysis
);

// Obtener un análisis por ID
router.get('/:id', 
    verifyToken, 
    checkRole([1, 2]), 
    analysisController.getAnalysisById
);

// Crear nuevo análisis
router.post('/', 
    verifyToken, 
    checkRole([1]), 
    analysisController.createAnalysis
);

// Actualizar análisis
router.put('/:id', 
    verifyToken, 
    checkRole([1]), 
    analysisController.updateExistingAnalysis
);

// Eliminar análisis
router.delete('/:id', 
    verifyToken, 
    checkRole([1]), 
    analysisController.deleteAnalysis
);

// Ejecutar análisis
router.post('/run/:id', 
    verifyToken, 
    checkRole([1]), 
    analysisController.runNewAnalysis
);

// Obtener índices
router.get('/:id/indices', 
    verifyToken, 
    checkRole([1, 2]), 
    analysisController.getAnalysisIndices
);

// Obtener sensores
router.get('/:id/sensores', 
    verifyToken, 
    checkRole([1, 2]), 
    analysisController.getUsedSensors
);

module.exports = router;