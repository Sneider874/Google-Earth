// src/routes/user.routes.js (FINAL)
const express = require('express'); 
const router = express.Router(); 
const userController = require('../controllers/user.controller.js'); 
const verifyToken = require('../middleware/auth.middleware'); // <-- Usar Token

// Las rutas de gestión de usuarios requieren autenticación
router.get('/', verifyToken, userController.listUsers);            
router.get('/:id', verifyToken, userController.getUserProfile);    
router.put('/:id', verifyToken, userController.updateUser); 
router.delete('/:id', verifyToken, userController.deleteUser); 

module.exports = router;