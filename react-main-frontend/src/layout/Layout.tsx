import { Outlet, Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export default function Layout() {
    const logout = useAuthStore((s) => s.logout)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <div className="flex min-h-screen">

            <aside className="w-64 bg-gray-900 text-white p-4">
                <h1 className="text-xl font-bold mb-6">
                    Collaboration Platform
                </h1>

                <nav className="flex flex-col gap-3">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/project">Project</Link>
                    <Link to="/analytics">Analytics</Link>

                    <button onClick={handleLogout} className="mt-4 text-red-400">
                        Logout
                    </button>
                </nav>
            </aside>

            <main className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    )
}