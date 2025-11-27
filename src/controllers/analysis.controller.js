const analysisService = require('../services/analysis.services');

// Obtener todos los análisis
exports.getAllAnalysis = async (req, res) => {
    try {
        console.log('📋 GET /api/analisis - Obteniendo todos los análisis');
        const analyses = await analysisService.getAllAnalysis();
        res.json(analyses);
    } catch (error) {
        console.error(' Error en getAllAnalysis:', error);
        res.status(500).json({ 
            message: 'Error al obtener los análisis',
            error: error.message 
        });
    }
};

// Obtener un análisis por ID
exports.getAnalysisById = async (req, res) => {
    try {
        console.log('🔍 GET /api/analisis/:id - ID:', req.params.id);
        const analysis = await analysisService.getAnalysisById(req.params.id);
        
        if (!analysis) {
            return res.status(404).json({ message: 'Análisis no encontrado' });
        }
        
        res.json(analysis);
    } catch (error) {
        console.error(' Error en getAnalysisById:', error);
        res.status(500).json({ 
            message: 'Error al obtener el análisis',
            error: error.message 
        });
    }
};

// Crear nuevo análisis
exports.createAnalysis = async (req, res) => {
    try {
        console.log('➕ POST /api/analisis - Datos recibidos:', req.body);
        console.log('👤 Usuario:', req.user);
        
        const newId = await analysisService.createAnalysis(req.body);
        
        res.status(201).json({ 
            message: 'Análisis creado exitosamente', 
            id: newId 
        });
    } catch (error) {
        console.error(' Error en createAnalysis:', error);
        res.status(500).json({ 
            message: 'Error al crear el análisis',
            error: error.message 
        });
    }
};

// Actualizar análisis
exports.updateExistingAnalysis = async (req, res) => {
    try {
        console.log('✏️ PUT /api/analisis/:id - ID:', req.params.id);
        console.log('📝 Datos recibidos:', req.body);
        console.log('👤 Usuario:', req.user);
        
        const updated = await analysisService.updateExistingAnalysis(req.params.id, req.body);
        
        if (!updated) {
            return res.status(404).json({ message: 'Análisis no encontrado' });
        }
        
        res.json({ message: 'Análisis actualizado correctamente' });
    } catch (error) {
        console.error(' Error en updateExistingAnalysis:', error);
        res.status(500).json({ 
            message: 'Error al actualizar el análisis',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Eliminar análisis
exports.deleteAnalysis = async (req, res) => {
    try {
        console.log('🗑️ DELETE /api/analisis/:id - ID:', req.params.id);
        console.log('👤 Usuario:', req.user);
        
        const deleted = await analysisService.deleteAnalysis(req.params.id);
        
        if (!deleted) {
            return res.status(404).json({ message: 'Análisis no encontrado' });
        }
        
        res.json({ message: 'Análisis eliminado correctamente' });
    } catch (error) {
        console.error(' Error en deleteAnalysis:', error);
        res.status(500).json({ 
            message: 'Error al eliminar el análisis',
            error: error.message 
        });
    }
};

// Ejecutar análisis
exports.runNewAnalysis = async (req, res) => {
    try {
        console.log('▶️ POST /api/analisis/run/:id - ID:', req.params.id);
        console.log('👤 Usuario:', req.user);
        
        const result = await analysisService.runNewAnalysis(req.params.id);
        res.json(result);
    } catch (error) {
        console.error(' Error en runNewAnalysis:', error);
        res.status(500).json({ 
            message: 'Error al ejecutar el análisis',
            error: error.message 
        });
    }
};

// Obtener índices
exports.getAnalysisIndices = async (req, res) => {
    try {
        console.log('📊 GET /api/analisis/:id/indices - ID:', req.params.id);
        const result = await analysisService.getAnalysisIndices(req.params.id);
        res.json(result);
    } catch (error) {
        console.error(' Error en getAnalysisIndices:', error);
        res.status(500).json({ 
            message: 'Error al obtener los índices',
            error: error.message 
        });
    }
};

// Obtener sensores
exports.getUsedSensors = async (req, res) => {
    try {
        console.log('🛰️ GET /api/analisis/:id/sensores - ID:', req.params.id);
        const result = await analysisService.getUsedSensors(req.params.id);
        res.json(result);
    } catch (error) {
        console.error(' Error en getUsedSensors:', error);
        res.status(500).json({ 
            message: 'Error al obtener los sensores',
            error: error.message 
        });
    }
};