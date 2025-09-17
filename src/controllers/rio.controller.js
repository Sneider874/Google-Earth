const rioService = require('../services/rio.services');

exports.getChipaloInfo = async (req, res) => {
    try {
        const result = await rioService.getChipaloInfo();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la información del río Chipalo' });
    }
};

exports.getCombeimaInfo = async (req, res) => {
    try {
        const result = await rioService.getCombeimaInfo();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la información del río Combeima' });
    }
};

exports.getCombeimaStatistics = async (req, res) => {
    try {
        const result = await rioService.getCombeimaStatistics();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las estadísticas del río Combeima' });
    }
};

exports.runCombeimaAnalysis = async (req, res) => {
    try {
        const result = await rioService.runCombeimaAnalysis();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al ejecutar el análisis sobre Combeima' });
    }
};