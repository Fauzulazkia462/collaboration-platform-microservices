import http from "./http";

export const ProjectApi = {
    getAll() {
        return http.get(`/projects`);
    },

    create(data: {
        name: string;
        description: string;
        ownerId: string;
    }) {
        return http.post(`/projects`, data);
    }
};