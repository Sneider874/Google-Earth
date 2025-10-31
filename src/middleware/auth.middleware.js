// src/middleware/auth.middleware.js

const jwt = require('jsonwebtoken'); 
// Asume que dotenv.config() se llama en app.js y las variables están cargadas en process.env

/**
 * Middleware para verificar la validez del JWT.
 */
const verifyToken = (req, res, next) => { 
    // Intenta obtener el token de 'x-access-token' o 'Authorization' (Bearer Token)
    const token = req.headers['x-access-token'] || req.headers['authorization']; 
    
    if (!token) { 
        // 403 Forbidden: El cliente no proporcionó el token
        return res.status(403).json({ message: "Se requiere un token para esta acción." }); 
    } 

    try { 
        // Limpia el prefijo 'Bearer ' si está presente
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

        // Verifica y decodifica el token usando la clave secreta del .env
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET); 
        
        // Adjunta el payload (por ejemplo, { idUsuario: 1, rol: 'admin' }) a la solicitud
        req.user = decoded; 
        next(); 
    } catch (error) { 
        // 401 Unauthorized: El token es inválido o ha expirado
        return res.status(401).json({ message: "Token inválido o expirado." }); 
    } 
}; 

module.exports = verifyToken;