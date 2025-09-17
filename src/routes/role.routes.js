const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

router.get('/', roleController.listRoles);
router.post('/', roleController.createRole);
router.get('/:id', roleController.getRoleById);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

// Endpoint para asignar un rol a un usuario
router.post('/users/:id/assign_role', roleController.assignRoleToUser);

module.exports = router;