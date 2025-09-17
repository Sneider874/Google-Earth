const db = require('../config/db.config');

// Obtener todos los usuarios
exports.findAll = async () => {
  const [rows] = await db.execute('SELECT * FROM usuario');
  return rows;
};

// Obtener usuario por ID
exports.findById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM usuario WHERE idUsuario = ?', [id]);
  return rows[0];
};

// Crear usuario
exports.create = async (newUser) => {
  const [result] = await db.execute(
    'INSERT INTO usuario (nombre, correo, rol) VALUES (?, ?, ?)',
    [newUser.nombre, newUser.correo, newUser.rol]
  );
  return { id: result.insertId, ...newUser };
};

// Actualizar usuario
exports.update = async (id, updatedUser) => {
  const [result] = await db.execute(
    'UPDATE usuario SET nombre = ?, correo = ?, rol = ? WHERE idUsuario = ?',
    [updatedUser.nombre, updatedUser.correo, updatedUser.rol, id]
  );
  return result.affectedRows > 0;
};

// Eliminar usuario
exports.remove = async (id) => {
  const [result] = await db.execute('DELETE FROM usuario WHERE idUsuario = ?', [id]);
  return result.affectedRows > 0;
};
