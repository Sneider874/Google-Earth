const estadisticaService = require('../services/estadistica.services');

exports.getSummary = async (req, res) => {
    try {
        const result = await estadisticaService.getSummary(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el resumen de estadísticas' });
    }
};