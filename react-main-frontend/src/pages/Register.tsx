import { useState } from "react"
import { userClient } from "../api/userClient"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async () => {
        await userClient.post("/auth/register", {
            fullName,
            email,
            password,
        })

        navigate("/login")
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl mb-4">Register</h1>

            <input
                placeholder="Full Name"
                className="border p-2 mb-2"
                onChange={(e) => setFullName(e.target.value)}
            />

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
                onClick={handleRegister}
                className="bg-green-500 text-white px-4 py-2"
            >
                Register
            </button>

            <p className="mt-4">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    )
}