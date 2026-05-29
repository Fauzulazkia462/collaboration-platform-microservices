import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import Layout from "./layout/Layout"
import Dashboard from "./pages/Dashboard"
import ProjectPageLoader from "./pages/ProjectPageLoader"
import AnalyticsPageLoader from "./pages/AnalyticsPageLoader"
import Login from "./pages/Login"
import Register from "./pages/Register"

import ProtectedRoute from "./routes/ProtectedRoute"
import PublicRoute from "./routes/PublicRoute"

import { useAuthStore } from "./store/authStore"

export default function App() {
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [])
  
  return (
    <Routes>

      {/* default route */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* protected layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="project" element={<ProjectPageLoader />} />
        <Route path="analytics" element={<AnalyticsPageLoader />} />
      </Route>

    </Routes>
  )
}