

const userService = require('../services/user.services');
const bcrypt = require('bcryptjs');


// Nuevos requires para avatar

const path = require('path');
const fs = require('fs');


// LISTAR USUARIOS

exports.listUsers = async (req, res) => {
    try {
        const users = await userService.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar usuarios', error: error.message });
    }
};


// OBTENER USUARIO POR ID
exports.getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.findById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
};


// REGISTRAR USUARIO
exports.registerUser = async (req, res) => {
    try {
        const newUser = await userService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
};


// ACTUALIZAR USUARIO POR ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.body.contrasena && req.body.contrasena.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            req.body.contrasena = await bcrypt.hash(req.body.contrasena, salt);
        } else {
            delete req.body.contrasena;
        }

        const updated = await userService.update(id, req.body);
        if (updated) {
            res.status(200).json({ message: 'Usuario actualizado con éxito' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};


// ELIMINAR USUARIO POR ID

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const removed = await userService.remove(id);
        if (removed) {
            res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};


// OBTENER PERFIL PROPIO (TOKEN)

exports.getMyProfile = async (req, res) => {
    try {
        console.log('req.user en getMyProfile:', req.user);
        const userId = req.user.idUsuario;

        if (!userId) {
            return res.status(400).json({ message: 'ID de usuario no encontrado en el token' });
        }

        const user = await userService.getFullProfile(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error en getMyProfile:', error);
        res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
    }
};


// ACTUALIZAR PERFIL PROPIO

exports.updateMyProfile = async (req, res) => {
    try {
        const userId = req.user.idUsuario;

        if (!userId) {
            return res.status(400).json({ message: 'ID de usuario no encontrado en el token' });
        }

        if (req.body.contrasena && req.body.contrasena.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            req.body.contrasena = await bcrypt.hash(req.body.contrasena, salt);
        } else {
            delete req.body.contrasena;
        }

        const updated = await userService.update(userId, req.body);
        if (updated) {
            res.status(200).json({ message: 'Perfil actualizado con éxito' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error en updateMyProfile:', error);
        res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
    }
};


// ACTUALIZAR PRIVACIDAD

exports.updatePrivacy = async (req, res) => {
    try {
        const userId = req.user.idUsuario;
        const { isPublic } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'ID de usuario no encontrado en el token' });
        }

        const updated = await userService.updatePrivacy(userId, isPublic);
        if (updated) {
            res.status(200).json({
                message: `Perfil cambiado a ${isPublic ? 'público' : 'privado'}`,
                isPublic
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error en updatePrivacy:', error);
        res.status(500).json({ message: 'Error al actualizar privacidad', error: error.message });
    }
};


// SUBIR AVATAR

exports.uploadAvatar = async (req, res) => {
    try {
        const userId = req.user.idUsuario;

        if (!req.file) {
            return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
        }

        // Obtener usuario para eliminar imagen anterior
        const user = await userService.findById(userId);
        if (user.imagenUrl) {
            const oldImagePath = path.join(__dirname, '..', '..', user.imagenUrl);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        const imagePath = `/uploads/avatars/${req.file.filename}`;
        await userService.updateAvatar(userId, imagePath);

        res.status(200).json({
            message: 'Avatar actualizado correctamente',
            imagenUrl: imagePath
        });
    } catch (error) {
        console.error('Error al subir avatar:', error);
        res.status(500).json({
            message: 'Error al subir imagen',
            error: error.message
        });
    }
};


// ELIMINAR MI CUENTA

exports.deleteMyAccount = async (req, res) => {
    try {
        const userId = req.user.idUsuario;

        if (!userId) {
            return res.status(400).json({ message: 'ID de usuario no encontrado' });
        }

        // Obtener usuario para eliminar imagen si existe
        const user = await userService.findById(userId);
        
        if (user && user.imagenUrl) {
            const imagePath = path.join(__dirname, '..', '..', user.imagenUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Eliminar usuario de la base de datos
        const removed = await userService.remove(userId);
        
        if (removed) {
            res.status(200).json({ 
                message: 'Cuenta eliminada exitosamente' 
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar cuenta:', error);
        res.status(500).json({ 
            message: 'Error al eliminar cuenta', 
            error: error.message 
        });
    }
};
