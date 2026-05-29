import axios from "axios"

const NO_AUTH_ROUTES = ["/auth/login", "/auth/register"]

export const userClient = axios.create({
    baseURL: "http://localhost:8081/api/v1",
})

userClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    const url = config.url || ""

    const isPublicRoute = NO_AUTH_ROUTES.some((route) =>
        url.includes(route)
    )

    if (token && !isPublicRoute) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})