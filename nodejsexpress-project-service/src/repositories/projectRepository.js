const pool = require('../config/db');

class ProjectRepository {
    async createProject(name, description, ownerId) {
        const result = await pool.query(
            `INSERT INTO projects(name, description, owner_id)
             VALUES($1, $2, $3)
             RETURNING *`,
            [name, description, ownerId]
        );

        return result.rows[0];
    }

    async createTask(projectId, title, status, assignedTo) {
        const result = await pool.query(
            `INSERT INTO tasks(project_id, title, status, assigned_to)
             VALUES($1, $2, $3, $4)
             RETURNING *`,
            [projectId, title, status, assignedTo]
        );

        return result.rows[0];
    }

    async getAllProjects() {
        const result = await pool.query(`SELECT * FROM projects ORDER BY id DESC`);
        return result.rows;
    }

    async getProjectsByOwner(ownerId) {
        const result = await pool.query(
            `SELECT * FROM projects WHERE owner_id = $1 ORDER BY id DESC`,
            [ownerId]
        );
        return result.rows;
    }

    async getAllTasks() {
        const result = await pool.query(`SELECT * FROM tasks ORDER BY id DESC`);
        return result.rows;
    }

    async getTasksByProject(projectId) {
        const result = await pool.query(
            `SELECT * FROM tasks WHERE project_id = $1 ORDER BY id DESC`,
            [projectId]
        );
        return result.rows;
    }

    async getTasksByAssignee(assignee) {
        const result = await pool.query(
            `SELECT * FROM tasks WHERE assigned_to = $1 ORDER BY id DESC`,
            [assignee]
        );
        return result.rows;
    }
}

module.exports = new ProjectRepository();