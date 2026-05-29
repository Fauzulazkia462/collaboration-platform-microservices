import axios from "axios";
import { hostProps } from "../../main";

function authHeaders() {
    const state = hostProps?.getState?.();

    const token = state?.token;

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}

export class ApiService {

    static async getProjects() {
        return axios.get(
            "http://localhost:3001/api/v1/projects",
            authHeaders()
        );
    }

    static async getActivities() {
        return axios.get(
            "http://localhost:8000/api/v1/activities",
            authHeaders()
        );
    }

    static async getActivitiesByProject(projectId: number) {
        return axios.get(
            `http://localhost:8000/api/v1/activities/project/${projectId}`,
            authHeaders()
        );
    }

    static async getTodayTasks() {
        return axios.get(
            "http://localhost:8084/api/v1/analytics/tasks/created/today",
            authHeaders()
        );
    }
}