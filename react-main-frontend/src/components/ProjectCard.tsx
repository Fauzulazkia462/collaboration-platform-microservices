type Project = {
    id: number
    name: string
    description: string
}

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
            <h2 className="text-lg text-blue-600 font-semibold">
                {project.name}
            </h2>

            <p className="text-gray-600 text-sm mt-2">
                {project.description}
            </p>
        </div>
    )
}