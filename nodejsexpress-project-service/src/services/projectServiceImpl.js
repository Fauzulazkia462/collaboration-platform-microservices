const projectRepository = require('../repositories/projectRepository');
const eventPublisher = require('../events/projectEventPublisher');

class ProjectService {
    async createProject(data) {
        const project = await projectRepository.createProject(
            data.name,
            data.description,
            data.ownerId
        );

        eventPublisher.projectCreated(project);

        return project;
    }

    async createTask(data) {
        const task = await projectRepository.createTask(
            data.projectId,
            data.title,
            "TODO",
            data.assignedTo
        );

        eventPublisher.taskCreated(task);

        return task;
    }

    async getAllProjects() {
        return await projectRepository.getAllProjects();
    }

    async getProjectsByOwner(ownerId) {
        return await projectRepository.getProjectsByOwner(ownerId);
    }

    async getAllTasks() {
        return await projectRepository.getAllTasks();
    }

    async getTasksByProject(projectId) {
        return await projectRepository.getTasksByProject(projectId);
    }

    async getTasksByAssignee(assignee) {
        return await projectRepository.getTasksByAssignee(assignee);
    }
}

module.exports = new ProjectService();