const express = require('express');
const router = express.Router();
const estadisticaController = require('../controllers/estadistica.controller');


router.get('/:id', estadisticaController.getSummary);

module.exports = router;