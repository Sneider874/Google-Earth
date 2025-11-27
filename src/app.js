// app.js (Backend Node.js - CORREGIDO con CORS)

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // ✅ AGREGAR ESTO

// --- Rutas ---
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const projectRoutes = require('./routes/project.routes');
const homeRoutes = require('./routes/home.routes');
const analysisRoutes = require('./routes/analysis.routes');
const resultadoRoutes = require('./routes/resultado.routes');
const rioRoutes = require('./routes/rio.routes');
const reporteRoutes = require('./routes/reporte.routes');
const estadisticaRoutes = require('./routes/estadistica.routes');

dotenv.config();
const app = express();

// 🚨 CRÍTICO: Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

// ✅ AGREGAR ESTO: Servir archivos estáticos (imágenes de perfil)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// --- Registrar Rutas en la App ---
app.use('/', homeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/proyectos', projectRoutes);
app.use('/api/analisis', analysisRoutes);
app.use('/api/resultados', resultadoRoutes);
app.use('/api/rios', rioRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/estadisticas', estadisticaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
