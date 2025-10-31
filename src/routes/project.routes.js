// src/routes/project.routes.js
const express = require('express'); 
const router = express.Router(); 
const projectController = require('../controllers/project.controller'); 
const verifyToken = require('../middleware/auth.middleware'); // <-- Importar

// Rutas Protegidas
router.get('/', verifyToken, projectController.listProjects); 
router.post('/', verifyToken, projectController.createProject); 
router.get('/:id', verifyToken, projectController.getProjectDetails); 
router.put('/:id', verifyToken, projectController.updateProject); 
router.delete('/:id', verifyToken, projectController.deleteProject); 

module.exports = router;