// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// RUTA PÚBLICA: Iniciar sesión y obtener el Token
router.post('/login', authController.login);
// RUTA PÚBLICA: Registro de un nuevo usuario (Ahora envía correo)
router.post('/register', authController.register); // <-- ¡Línea 7!

// **NUEVA RUTA PÚBLICA**: Ruta que el usuario visita desde su correo
router.get('/verify', authController.verifyEmail); 

module.exports = router;