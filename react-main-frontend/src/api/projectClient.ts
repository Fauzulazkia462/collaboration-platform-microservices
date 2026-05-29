import axios from "axios"

export const projectClient = axios.create({
    baseURL: "http://localhost:3001/api/v1",
})

projectClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})