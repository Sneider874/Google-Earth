const reporteService = require('../services/reporte.services');

exports.generateReport = async (req, res) => {
    try {
        const result = await reporteService.generateNewReport();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el reporte' });
    }
};

exports.getDetailedAreas = async (req, res) => {
    try {
        const result = await reporteService.getDetailedAreaReport(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el reporte de áreas' });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const result = await reporteService.deleteReport(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el reporte' });
    }
};