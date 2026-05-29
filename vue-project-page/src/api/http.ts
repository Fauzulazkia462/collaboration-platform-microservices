import axios from "axios";
import { HostBridge } from "../bridge/hostBridge";

const http = axios.create({
    baseURL: "http://localhost:3001/api/v1"
});

http.interceptors.request.use((config) => {
    const token = HostBridge.getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default http;