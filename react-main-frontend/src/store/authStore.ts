import { create } from "zustand"
import { jwtDecode } from "jwt-decode"
import { userClient } from "../api/userClient"

type JwtPayload = {
    sub: string
    role: string
    exp: number
    iat: number
}

type AuthState = {
    token: string | null
    email: string | null
    role: string | null
    hydrate: () => void
    setToken: (token: string | null) => void
    logout: () => void
}

const getDecoded = (token: string) => {
    return jwtDecode<JwtPayload>(token)
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    email: null,
    role: null,

    hydrate: () => {
        const token = localStorage.getItem("token")

        if (!token) return

        const decoded = getDecoded(token)

        set({
            token,
            email: decoded.sub,
            role: decoded.role,
        })
    },

    setToken: (token) => {
        if (token) {
            localStorage.setItem("token", token)

            const decoded = getDecoded(token)

            set({
                token,
                email: decoded.sub,
                role: decoded.role,
            })
        } else {
            localStorage.removeItem("token")
            set({
                token: null,
                email: null,
                role: null,
            })
        }
    },

    logout: async () => {
        try {
            await userClient.post("/auth/logout")
        } catch (err) {
            console.warn("Logout request failed", err)
        }

        localStorage.removeItem("token")

        set({
            token: null,
            email: null,
            role: null,
        })
    },
}))