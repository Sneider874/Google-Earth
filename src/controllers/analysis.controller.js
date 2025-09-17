const analysisService = require('../services/analysis.services');

exports.runNewAnalysis = async (req, res) => {
    try {
        const result = await analysisService.runNewAnalysis(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al ejecutar el análisis' });
    }
};

exports.deleteAnalysis = async (req, res) => {
    try {
        const deleted = await analysisService.deleteAnalysis(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Análisis no encontrado' });
        }
        res.json({ message: 'Análisis eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el análisis' });
    }
};

exports.getAnalysisIndices = async (req, res) => {
    try {
        const result = await analysisService.getAnalysisIndices(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los índices' });
    }
};

exports.getUsedSensors = async (req, res) => {
    try {
        const result = await analysisService.getUsedSensors(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los sensores' });
    }
};

exports.updateExistingAnalysis = async (req, res) => {
    try {
        const result = await analysisService.updateExistingAnalysis(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el análisis' });
    }
};