const roleService = require('../services/role.services');

exports.listRoles = async (req, res) => {
  try {
    const roles = await roleService.findAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener roles' });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await roleService.findRoleById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rol' });
  }
};

exports.createRole = async (req, res) => {
  try {
    const newRole = await roleService.createRole(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear rol' });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const updated = await roleService.updateRole(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.json({ message: 'Rol actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar rol' });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const deleted = await roleService.deleteRole(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar rol' });
  }
};

exports.assignRoleToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { roleId } = req.body;
    const result = await roleService.assignRoleToUser(userId, roleId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar rol' });
  }
};