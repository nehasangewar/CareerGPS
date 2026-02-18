import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import roadmapData from "../data/roadmapData"
import TaskList from "../components/roadmap/TaskList"

export default function Dashboard() {
  const { goal } = useContext(AppContext)

  const [semester, setSemester] = useState("semester1")
  const [month, setMonth] = useState("month1")
  const [week, setWeek] = useState("week1")

  if (!goal) return <div className="p-10">No goal selected</div>

  const data = roadmapData[goal]?.[semester]?.[month]?.[week] || []

  return (
    <div className="min-h-screen p-10 space-y-8">

      <h1 className="text-3xl font-bold">{goal}</h1>

      <div className="flex gap-4">
        {Object.keys(roadmapData[goal]).map((sem) => (
          <button key={sem}
            onClick={() => { setSemester(sem); setMonth("month1"); setWeek("week1") }}
            className="px-4 py-2 bg-slate-800 rounded-lg">
            {sem}
          </button>
        ))}
      </div>

      <TaskList tasks={data} semester={semester} month={month} week={week} />

    </div>
  )
}