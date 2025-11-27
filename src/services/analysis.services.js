const db = require('../config/db.config');

// Obtener todos los análisis
exports.getAllAnalysis = async () => {
    try {
        const [rows] = await db.execute(
            'SELECT * FROM analisis ORDER BY fecha_creacion DESC'
        );
        return rows;
    } catch (error) {
        console.error(' Error en getAllAnalysis:', error);
        throw error;
    }
};

// Obtener un análisis por ID
exports.getAnalysisById = async (id) => {
    try {
        const [rows] = await db.execute('SELECT * FROM analisis WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error(' Error en getAnalysisById:', error);
        throw error;
    }
};

// Crear nuevo análisis
exports.createAnalysis = async (data) => {
    try {
        const { id_proyecto, nombre_analisis, tipo, descripcion, estado } = data;
        
        console.log('📝 Creando análisis:', data);
        
        const [result] = await db.execute(
            'INSERT INTO analisis (id_proyecto, nombre_analisis, tipo, descripcion, estado) VALUES (?, ?, ?, ?, ?)',
            [id_proyecto || null, nombre_analisis, tipo, descripcion || null, estado || 'Pendiente']
        );
        
        console.log('✅ Análisis creado con ID:', result.insertId);
        return result.insertId;
    } catch (error) {
        console.error(' Error en createAnalysis:', error);
        throw error;
    }
};

// Actualizar análisis existente
exports.updateExistingAnalysis = async (id, data) => {
    try {
        const { id_proyecto, nombre_analisis, tipo, descripcion, estado, resultado } = data;
        
        console.log('📝 Actualizando análisis ID:', id, 'con datos:', data);
        
        // Construir la query dinámicamente solo con los campos que vienen en data
        let query = 'UPDATE analisis SET ';
        let params = [];
        let fields = [];

        if (nombre_analisis !== undefined) {
            fields.push('nombre_analisis = ?');
            params.push(nombre_analisis);
        }
        if (tipo !== undefined) {
            fields.push('tipo = ?');
            params.push(tipo);
        }
        if (descripcion !== undefined) {
            fields.push('descripcion = ?');
            params.push(descripcion);
        }
        if (estado !== undefined) {
            fields.push('estado = ?');
            params.push(estado);
        }
        if (resultado !== undefined) {
            fields.push('resultado = ?');
            params.push(resultado);
        }
        if (id_proyecto !== undefined) {
            fields.push('id_proyecto = ?');
            params.push(id_proyecto);
        }

        if (fields.length === 0) {
            throw new Error('No hay campos para actualizar');
        }

        query += fields.join(', ') + ' WHERE id = ?';
        params.push(id);

        console.log('📝 Query SQL:', query);
        console.log('📝 Parámetros:', params);

        const [result] = await db.execute(query, params);
        
        console.log(' Análisis actualizado. Filas afectadas:', result.affectedRows);
        
        return result.affectedRows > 0;
    } catch (error) {
        console.error(' Error en updateExistingAnalysis:', error);
        throw error;
    }
};

// Eliminar análisis
exports.deleteAnalysis = async (id) => {
    try {
        console.log('🗑️ Eliminando análisis ID:', id);
        
        const [result] = await db.execute('DELETE FROM analisis WHERE id = ?', [id]);
        
        console.log(' Análisis eliminado. Filas afectadas:', result.affectedRows);
        
        return result.affectedRows > 0;
    } catch (error) {
        console.error(' Error en deleteAnalysis:', error);
        throw error;
    }
};

// Ejecutar nuevo análisis
exports.runNewAnalysis = async (id) => {
    try {
        console.log('▶️ Ejecutando análisis ID:', id);
        
        const [result] = await db.execute(
            'UPDATE analisis SET estado = ? WHERE id = ?',
            ['En Proceso', id]
        );
        
        console.log(' Análisis ejecutado. Estado actualizado a "En Proceso"');
        
        return { 
            message: `Ejecutando análisis para el ID: ${id}`, 
            success: true 
        };
    } catch (error) {
        console.error(' Error en runNewAnalysis:', error);
        throw error;
    }
};

// Obtener índices de vegetación y agua
exports.getAnalysisIndices = async (id) => {
    try {
        const [rows] = await db.execute(
            'SELECT resultado FROM analisis WHERE id = ?',
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error(' Error en getAnalysisIndices:', error);
        throw error;
    }
};

// Obtener sensores utilizados
exports.getUsedSensors = async (id) => {
    try {
        return { 
            message: `Obteniendo sensores utilizados para el análisis ID: ${id}` 
        };
    } catch (error) {
        console.error(' Error en getUsedSensors:', error);
        throw error;
    }
};