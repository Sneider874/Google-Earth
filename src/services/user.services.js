const db = require('../config/db.config'); 

//  Obtener todos los usuarios (Usada en GET /api/users)
exports.findAll = async () => { 
    const [rows] = await db.execute('SELECT idUsuario, nombre, correo, rol FROM usuario'); 
    return rows; 
}; 

//  Obtener usuario por ID (Usada en GET /api/users/:id)
exports.findById = async (id) => { 
    //  AGREGADO: imagenUrl
    const [rows] = await db.execute('SELECT idUsuario, nombre, correo, rol, isPublic, imagenUrl FROM usuario WHERE idUsuario = ?', [id]); 
    return rows[0]; 
}; 

//  Crear usuario (Usada en POST /api/auth/register)
exports.create = async (newUser) => { 
    const [result] = await db.execute( 
        'INSERT INTO usuario (nombre, correo, rol, contrasena, isVerified, isPublic) VALUES (?, ?, ?, ?, 0, 0)', 
        [newUser.nombre, newUser.correo, newUser.rol, newUser.contrasena] 
    ); 
    return { id: result.insertId, ...newUser }; 
}; 

//  Actualizar usuario 
exports.update = async (id, updatedUser) => { 
    let query = 'UPDATE usuario SET nombre = ?, correo = ?';
    let params = [updatedUser.nombre, updatedUser.correo];
    
    // Solo actualizar contraseña si se proporciona
    if (updatedUser.contrasena) {
        query += ', contrasena = ?';
        params.push(updatedUser.contrasena);
    }
    
    query += ' WHERE idUsuario = ?';
    params.push(id);
    
    const [result] = await db.execute(query, params);
    return result.affectedRows > 0; 
}; 

//  Eliminar usuario 
exports.remove = async (id) => { 
    const [result] = await db.execute('DELETE FROM usuario WHERE idUsuario = ?', [id]); 
    return result.affectedRows > 0; 
}; 

//  Obtener usuario por Correo 
exports.findByEmail = async (correo) => { 
    //  AGREGADO: imagenUrl
    const [rows] = await db.execute('SELECT idUsuario, nombre, correo, rol, contrasena, isVerified, isPublic, imagenUrl FROM usuario WHERE correo = ?', [correo]); 
    return rows[0]; 
};

//  Actualizar estado de verificación
exports.updateVerificationStatus = async (idUsuario, status) => { 
    const statusValue = status ? 1 : 0; 
    const [result] = await db.execute(
        'UPDATE usuario SET isVerified = ? WHERE idUsuario = ?', 
        [statusValue, idUsuario] 
    ); 
    return result.affectedRows > 0; 
};

//  Actualizar privacidad del perfil
exports.updatePrivacy = async (idUsuario, isPublic) => {
    const privacyValue = isPublic ? 1 : 0;
    const [result] = await db.execute(
        'UPDATE usuario SET isPublic = ? WHERE idUsuario = ?',
        [privacyValue, idUsuario]
    );
    return result.affectedRows > 0;
};

//  Obtener perfil completo del usuario (con más detalles)
exports.getFullProfile = async (idUsuario) => {
    //  AGREGADO: imagenUrl
    const [rows] = await db.execute(
        'SELECT idUsuario, nombre, correo, rol, isVerified, isPublic, imagenUrl FROM usuario WHERE idUsuario = ?',
        [idUsuario]
    );
    return rows[0];
};

//  Actualizar avatar del usuario
exports.updateAvatar = async (idUsuario, imagenUrl) => {
    const [result] = await db.execute(
        'UPDATE usuario SET imagenUrl = ? WHERE idUsuario = ?',
        [imagenUrl, idUsuario]
    );
    return result.affectedRows > 0;
};