
const express = require('express'); 
const router = express.Router(); 
const userController = require('../controllers/user.controller.js'); 
const { verifyToken, checkRole } = require('../middleware/auth.middleware'); 
const upload = require('../config/multer.config');



// Obtener MI perfil (usuario autenticado)
router.get('/profile/me', 
    verifyToken, 
    userController.getMyProfile
);

// Actualizar MI perfil (usuario autenticado)
router.put('/profile/me', 
    verifyToken, 
    userController.updateMyProfile
);

// Actualizar privacidad de MI perfil
router.put('/profile/privacy', 
    verifyToken, 
    userController.updatePrivacy
);

// Subir avatar del perfil
router.post('/profile/avatar', 
    verifyToken, 
    upload.single('avatar'),
    userController.uploadAvatar
);


// Eliminar MI cuenta (usuario autenticado)
router.delete('/profile/me', 
    verifyToken, 
    userController.deleteMyAccount
);



// 1. Obtener TODOS los usuarios (Lista de usuarios)
router.get('/', 
    verifyToken, 
    checkRole([1]), 
    userController.listUsers
);            

// 2. Obtener Perfil de UN usuario por ID
router.get('/:id', 
    verifyToken, 
    checkRole([1, 2]), 
    userController.getUserProfile
);    

// 3. Actualizar un usuario por ID (Solo Admin)
router.put('/:id', 
    verifyToken, 
    checkRole([1]), 
    userController.updateUser
); 

// 4. Eliminar un usuario por ID (Solo Admin)
router.delete('/:id', 
    verifyToken, 
    checkRole([1]), 
    userController.deleteUser
); 

module.exports = router;