// src/controllers/auth.controller.js
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const userService = require('../services/user.services'); 
const emailService = require('../services/email.service'); 

// 🚨 FUNCIÓN FALTANTE: Maneja la lógica de inicio de sesión
exports.login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        
        // 1. Buscar usuario por correo
        const user = await userService.findByEmail(correo);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        
        // 2. Verificar la contraseña
        const isPasswordValid = bcrypt.compareSync(contrasena, user.contrasena);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }
        
        // 3. Verificar si el correo ha sido validado 
        // 🚨 IMPORTANTE: Asume que has modificado findByEmail para seleccionar isVerified
        // Si no lo seleccionas, esta verificación no funcionará.
        if (user.isVerified === 0) { // O !user.isVerified
             return res.status(401).json({ 
                 message: "Tu cuenta no ha sido verificada. Por favor, revisa tu correo." 
             });
        }

        // 4. Generar Token JWT (para login)
        const token = jwt.sign(
            { idUsuario: user.idUsuario, rol: user.rol }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES }
        );

        // 5. Respuesta exitosa
        res.status(200).json({ 
            token,
            user: { idUsuario: user.idUsuario, nombre: user.nombre, correo: user.correo, rol: user.rol } 
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { nombre, correo, contrasena, rol = 2 } = req.body; // Rol por defecto: Lector/Usuario estándar
        
        const existingUser = await userService.findByEmail(correo);
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado." });
        }
        
        // 1. Hashear Contraseña
        const hashedPassword = bcrypt.hashSync(contrasena, 10); 
        
        // 2. Crear Usuario con isVerified = 0 (falso por defecto en la DB)
        // **Recordatorio**: userService.create debe incluir isVerified = 0
        const newUser = await userService.create({ nombre, correo, contrasena: hashedPassword, rol });
        
        // 3. Generar Token de Verificación (Temporal)
        const verificationToken = jwt.sign(
            { idUsuario: newUser.id, correo: newUser.correo }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // Token expira en 1 hora
        );
        
        // 4. Enviar Correo
        await emailService.sendVerificationEmail(newUser.correo, verificationToken);

        // 5. Respuesta al Cliente
        res.status(201).json({ 
            message: "Usuario registrado. Por favor, revisa tu correo para verificar tu cuenta.", 
            idUsuario: newUser.id 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
};

// **FUNCIÓN: Maneja la lógica de verificación del enlace**
exports.verifyEmail = async (req, res) => {
    const { token } = req.query; // El token viene en la URL como query parameter
    
    if (!token) {
        return res.status(400).send(" Enlace de verificación incompleto.");
    }

    try {
        // 1. Verificar y decodificar el token
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        // 2. Marcar el usuario como verificado en la base de datos
        const success = await userService.updateVerificationStatus(payload.idUsuario, true);

        if (success) {
            // Redirige o muestra una página de éxito
            return res.send(' Cuenta verificada correctamente. Ya puedes iniciar sesión.');
        } else {
            return res.status(404).send(' Error al encontrar el usuario.');
        }

    } catch (err) {
        // Si el token es inválido o expiró
        return res.status(400).send(' Token inválido o expirado. Intenta registrarte de nuevo o solicita un nuevo enlace.');
    }
};