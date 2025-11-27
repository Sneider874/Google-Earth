
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
const userService = require('../services/user.services'); 
const emailService = require('../services/email.service'); 


exports.login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        
        //  Buscar usuario por correo
        const user = await userService.findByEmail(correo);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        
        //  Verificar la contraseña
        const isPasswordValid = bcrypt.compareSync(contrasena, user.contrasena);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }
        
        //  Verificar si el correo ha sido validado 
    
        if (user.isVerified === 0) { 
             return res.status(401).json({ 
                 message: "Tu cuenta no ha sido verificada. Por favor, revisa tu correo." 
             });
        }

        //  Generar Token JWT 
        const token = jwt.sign(
            { idUsuario: user.idUsuario, rol: user.rol }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES }
        );

        //  Respuesta exitosa
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
        
        //  Hashear Contraseña
        const hashedPassword = bcrypt.hashSync(contrasena, 10); 
        
        //  Crear Usuario con isVerified = 0 
        
        const newUser = await userService.create({ nombre, correo, contrasena: hashedPassword, rol });
        
        //  Generar Token de Verificación 
        const verificationToken = jwt.sign(
            { idUsuario: newUser.id, correo: newUser.correo }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
        );
        
        //  Enviar Correo
        await emailService.sendVerificationEmail(newUser.correo, verificationToken);

        //  Respuesta al Cliente
        res.status(201).json({ 
            message: "Usuario registrado. Por favor, revisa tu correo para verificar tu cuenta.", 
            idUsuario: newUser.id 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
};


exports.verifyEmail = async (req, res) => {
    const { token } = req.query; 
    
    if (!token) {
        return res.status(400).send(" Enlace de verificación incompleto.");
    }

    try {
        //  Verificar y decodificar el token
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        //  Marcar el usuario como verificado en la base de datos
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