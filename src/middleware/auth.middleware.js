
const jwt = require('jsonwebtoken'); 


const verifyToken = (req, res, next) => { 
    const token = req.headers['x-access-token'] || req.headers['authorization']; 
    
    if (!token) { 
        return res.status(403).json({ message: "Se requiere un token para esta acción." }); 
    } 

    try { 
        // Limpia el prefijo 'Bearer ' si está presente
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

        // Verifica y decodifica el token
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET); 
        
        //  Ver qué contiene el token decodificado
        console.log('Token decodificado:', decoded);
        

        req.user = decoded;
        
        //  Verificar que req.user se guardó correctamente
        console.log('req.user después de asignar:', req.user);
        
        next(); 
    } catch (error) { 
        console.error('Error al verificar token:', error.message);
        return res.status(401).json({ message: "Token inválido o expirado." }); 
    } 
}; 


const checkRole = (allowedRoles) => (req, res, next) => {
    
    if (!req.user || !req.user.rol) {
        console.error('checkRole: req.user o req.user.rol no existe:', req.user);
        return res.status(403).json({ message: "Error de autorización. Rol no encontrado." });
    }

    const userRole = req.user.rol;
    
    console.log('Verificando rol:', { userRole, allowedRoles });

    if (allowedRoles.includes(userRole)) {
        next();
    } else {
        return res.status(403).json({ message: "Acceso denegado. No tienes el rol necesario para esta acción." });
    }
};

module.exports = { 
    verifyToken,
    checkRole
};