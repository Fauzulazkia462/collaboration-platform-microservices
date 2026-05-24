const projectService = require('../services/projectServiceImpl');

class ProjectController {
    async createProject(req, res) {
        const project = await projectService.createProject(req.body);
        res.json(project);
    }

    async createTask(req, res) {
        const task = await projectService.createTask(req.body);
        res.json(task);
    }

    async getAllProjects(req, res) {
        const result = await projectService.getAllProjects();
        res.json(result);
    }

    async getProjectsByOwner(req, res) {
        const result = await projectService.getProjectsByOwner(req.params.ownerId);
        res.json(result);
    }

    async getAllTasks(req, res) {
        const result = await projectService.getAllTasks();
        res.json(result);
    }

    async getTasksByProject(req, res) {
        const result = await projectService.getTasksByProject(req.params.projectId);
        res.json(result);
    }

    async getTasksByAssignee(req, res) {
        const result = await projectService.getTasksByAssignee(req.params.assignee);
        res.json(result);
    }
}

module.exports = new ProjectController();