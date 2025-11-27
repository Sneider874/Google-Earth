const db = require('../config/db.config');


exports.findAllProjects = async () => {
    const [rows] = await db.execute('SELECT * FROM proyectos');
    return rows;
};

exports.findProjectById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM proyectos WHERE id = ?', [id]);
    return rows[0];
};

exports.createProject = async (newProject) => {
    const [result] = await db.execute(
        'INSERT INTO proyectos (nombre, descripcion) VALUES (?, ?)',
        [newProject.nombre, newProject.descripcion]
    );
    return { id: result.insertId, ...newProject };
};

exports.updateProject = async (id, updatedProject) => {
    const [result] = await db.execute(
        'UPDATE proyectos SET nombre = ?, descripcion = ? WHERE id = ?',
        [updatedProject.nombre, updatedProject.descripcion, id]
    );
    return result.affectedRows > 0;
};

exports.deleteProject = async (id) => {
    const [result] = await db.execute('DELETE FROM proyectos WHERE id = ?', [id]);
    return result.affectedRows > 0;
};