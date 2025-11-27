
const express = require('express'); 
const router = express.Router(); 
const roleController = require('../controllers/role.controller'); 
// Importamos los middlewares de autenticación y autorización
const { verifyToken, checkRole } = require('../middleware/auth.middleware'); 




//  Listar todos los roles
router.get('/', 
    verifyToken, 
    checkRole([1]), // Solo Administrador 
    roleController.listRoles
); 

//  Crear un nuevo rol
router.post('/', 
    verifyToken, 
    checkRole([1]), // Solo Administrador 
    roleController.createRole
); 

//  Obtener un rol por ID
router.get('/:id', 
    verifyToken, 
    checkRole([1]), // Solo Administrador 
    roleController.getRoleById
); 

//  Actualizar un rol
router.put('/:id', 
    verifyToken, 
    checkRole([1]), // Solo Administrador 
    roleController.updateRole
); 

//  Eliminar un rol
router.delete('/:id', 
    verifyToken, 
    checkRole([1]), // Solo Administrador 
    roleController.deleteRole
); 

//  Asignar un rol a un usuario 

router.post('/users/:userId/assign_role', 
    verifyToken, 
    checkRole([1]), // Solo Administrador 
    roleController.assignRoleToUser
); 

module.exports = router;