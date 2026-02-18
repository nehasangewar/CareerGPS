import Card from "../ui/Card"

export default function ProjectsSection({ projects }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold mb-4">Projects</h3>
      <ul className="space-y-2">
        {projects?.map((project, index) => (
          <li key={index} className="bg-slate-700 p-3 rounded-lg">
            {project}
          </li>
        ))}
      </ul>
    </Card>
  )
}