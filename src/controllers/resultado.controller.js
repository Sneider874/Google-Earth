const resultadoService = require('../services/resultado.services');

exports.getFinalWaterMask = async (req, res) => {
    try {
        const result = await resultadoService.getFinalWaterMask(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la máscara de agua final' });
    }
};

exports.getHighConfidenceWaterMask = async (req, res) => {
    try {
        const result = await resultadoService.getHighConfidenceWaterMask(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la máscara de agua de alta confianza' });
    }
};

exports.getJRCSeasonalWaterMask = async (req, res) => {
    try {
        const result = await resultadoService.getJRCSeasonalWaterMask(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la máscara histórica JRC estacional' });
    }
};

exports.getJRCPermanentWaterMask = async (req, res) => {
    try {
        const result = await resultadoService.getJRCPermanentWaterMask(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la máscara histórica JRC permanente' });
    }
};

exports.getJRCTotalWaterMask = async (req, res) => {
    try {
        const result = await resultadoService.getJRCTotalWaterMask(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la máscara histórica JRC total' });
    }
};

exports.getPrincipalRiverNetwork = async (req, res) => {
    try {
        const result = await resultadoService.getPrincipalRiverNetwork(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la red hidrográfica de ríos principales' });
    }
};

exports.getMediumRiverNetwork = async (req, res) => {
    try {
        const result = await resultadoService.getMediumRiverNetwork(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la red hidrográfica de ríos medianos' });
    }
};

exports.getSmallRiverNetwork = async (req, res) => {
    try {
        const result = await resultadoService.getSmallRiverNetwork(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la red hidrográfica de ríos pequeños' });
    }
};

exports.getRavineNetwork = async (req, res) => {
    try {
        const result = await resultadoService.getRavineNetwork(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la red hidrográfica de quebradas' });
    }
};