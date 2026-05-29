import { useEffect, useState, useRef } from "react"
import { projectClient } from "../api/projectClient"
import { useAuthStore } from "../store/authStore"
import ProjectCard from "../components/ProjectCard"

type Project = {
    id: number
    name: string
    description: string
}

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([])

    const token = useAuthStore((state) => state.token)
    const email = useAuthStore((state) => state.email)

    const fetchedRef = useRef(false)

    useEffect(() => {
        if (!token || !email) return
        if (fetchedRef.current) return

        fetchedRef.current = true

        projectClient
            .get(`/projects/owner/${email}`)
            .then((res) => setProjects(res.data))
    }, [token, email])

    return (
        <div>
            <h1 className="text-2xl text-blue-400 font-bold mb-4">
                Project you Created
            </h1>

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    )
}