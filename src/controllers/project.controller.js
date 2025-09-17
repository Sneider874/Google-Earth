const projectService = require('../services/project.services');

exports.listProjects = async (req, res) => {
  try {
    const projects = await projectService.findAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proyectos' });
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const project = await projectService.findProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proyecto' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = await projectService.createProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear proyecto' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updated = await projectService.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.json({ message: 'Proyecto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar proyecto' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await projectService.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar proyecto' });
  }
};