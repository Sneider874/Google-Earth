

const express = require('express'); 
const router = express.Router(); 
const projectController = require('../controllers/project.controller'); 


const { verifyToken, checkRole } = require('../middleware/auth.middleware'); 


router.get('/', 
    verifyToken, 
    checkRole([1, 2]), 
    projectController.listProjects
); 


router.post('/', 
    verifyToken, 
    checkRole([1]),
    projectController.createProject
); 


router.get('/:id', 
    verifyToken, 
    checkRole([1, 2]), 
    projectController.getProjectDetails
); 


router.put('/:id', 
    verifyToken, 
    checkRole([1]), 
    projectController.updateProject
); 


router.delete('/:id', 
    verifyToken, 
    checkRole([1]), 
    projectController.deleteProject
); 

module.exports = router;