// src/routes/role.routes.js
const express = require('express'); 
const router = express.Router(); 
const roleController = require('../controllers/role.controller'); 
const verifyToken = require('../middleware/auth.middleware'); // <-- Importar

// Rutas Protegidas (Idealmente solo accesibles por Admin/Usuarios con rol específico)
router.get('/', verifyToken, roleController.listRoles); 
router.post('/', verifyToken, roleController.createRole); 
router.get('/:id', verifyToken, roleController.getRoleById); 
router.put('/:id', verifyToken, roleController.updateRole); 
router.delete('/:id', verifyToken, roleController.deleteRole); 
router.post('/users/:id/assign_role', verifyToken, roleController.assignRoleToUser); 

module.exports = router;