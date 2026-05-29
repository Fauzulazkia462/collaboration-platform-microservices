import http from "./http";

export const TaskApi = {
    getAll() {
        return http.get(`/projects/tasks`);
    },

    getByProject(projectId: number) {
        return http.get(`/projects/tasks/project/${projectId}`);
    },

    getByAssignee(email: string) {
        return http.get(`/projects/tasks/assignee/${email}`);
    },

    create(data: {
        projectId: string;
        title: string;
        assignedTo: string;
    }) {
        return http.post(`/projects/task`, data);
    }
};