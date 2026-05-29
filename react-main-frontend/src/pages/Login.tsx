import { useState } from "react"
import { userClient } from "../api/userClient"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setToken = useAuthStore((s) => s.setToken)
    const navigate = useNavigate()

    const handleLogin = async () => {
        const res = await userClient.post("/auth/login", {
            email,
            password,
        })

        const token = res.data.token
        setToken(token)

        navigate("/dashboard")
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl mb-4">Login</h1>

            <input
                placeholder="Email"
                className="border p-2 mb-2"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                className="border p-2 mb-2"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2"
            >
                Login
            </button>

            <p className="mt-4">
                No account? <Link to="/register">Register</Link>
            </p>
        </div>
    )
}