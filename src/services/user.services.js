// src/services/user.services.js
const db = require('../config/db.config'); 

// 1. Obtener todos los usuarios (Usada en GET /api/users)
exports.findAll = async () => { 
    // No necesitamos la contraseña aquí
    const [rows] = await db.execute('SELECT idUsuario, nombre, correo, rol FROM usuario'); 
    return rows; 
}; 

// 2. Obtener usuario por ID (Usada en GET /api/users/:id)
// ¡ESTA ES LA FUNCIÓN QUE FALTABA O ESTABA MAL NOMBRADA!
exports.findById = async (id) => { 
    // No necesitamos la contraseña aquí
    const [rows] = await db.execute('SELECT idUsuario, nombre, correo, rol FROM usuario WHERE idUsuario = ?', [id]); 
    return rows[0]; 
}; 

// 3. Crear usuario (Usada en POST /api/auth/register)
exports.create = async (newUser) => { 
    // Asegúrate de que tu tabla tenga un DEFAULT 0 en isVerified,
    // o inclúyelo explícitamente aquí si es necesario:
    const [result] = await db.execute( 
        'INSERT INTO usuario (nombre, correo, rol, contrasena, isVerified) VALUES (?, ?, ?, ?, 0)', 
        [newUser.nombre, newUser.correo, newUser.rol, newUser.contrasena] 
    ); 
    return { id: result.insertId, ...newUser }; 
}; 

// 4. Actualizar usuario (Usada en PUT /api/users/:id)
exports.update = async (id, updatedUser) => { 
    // Debes decidir si permites actualizar la contraseña en esta ruta
    const [result] = await db.execute( 
        'UPDATE usuario SET nombre = ?, correo = ?, rol = ? WHERE idUsuario = ?', 
        [updatedUser.nombre, updatedUser.correo, updatedUser.rol, id] 
    ); 
    return result.affectedRows > 0; 
}; 

// 5. Eliminar usuario (Usada en DELETE /api/users/:id)
exports.remove = async (id) => { 
    const [result] = await db.execute('DELETE FROM usuario WHERE idUsuario = ?', [id]); 
    return result.affectedRows > 0; 
}; 

// 6. Obtener usuario por Correo (Usada en POST /api/auth/login)
// En src/services/user.services.js

exports.findByEmail = async (correo) => { 
    // MODIFICADO: Añadida la columna 'isVerified' a la selección
    const [rows] = await db.execute('SELECT idUsuario, nombre, correo, rol, contrasena, isVerified FROM usuario WHERE correo = ?', [correo]); 
    return rows[0]; 
};
// src/services/user.services.js (AÑADE ESTO)
// ... (otras funciones como findById, create, etc.) ...

// Nueva función para actualizar el estado de verificación
exports.updateVerificationStatus = async (idUsuario, status) => { 
    // Mapea true/false a 1/0 para MySQL BOOLEAN
    const statusValue = status ? 1 : 0; 

    const [result] = await db.execute(
        'UPDATE usuario SET isVerified = ? WHERE idUsuario = ?', 
        [statusValue, idUsuario] 
    ); 
    return result.affectedRows > 0; 
};