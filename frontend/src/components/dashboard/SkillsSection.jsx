import Card from "../ui/Card"

export default function SkillsSection({ skills }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold mb-4">Skills</h3>
      <ul className="space-y-2">
        {skills?.map((skill, index) => (
          <li key={index} className="bg-slate-700 p-3 rounded-lg">
            {skill}
          </li>
        ))}
      </ul>
    </Card>
  )
}