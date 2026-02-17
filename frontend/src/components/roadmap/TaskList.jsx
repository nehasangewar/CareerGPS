import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import ProgressBar from "./ProgressBar"

export default function TaskList({ tasks, semester, month, week }) {
  const { progress, setProgress } = useContext(AppContext)

  const toggle = (task) => {
    setProgress(prev => ({
      ...prev,
      [semester]: {
        ...prev[semester],
        [month]: {
          ...prev[semester]?.[month],
          [week]: {
            ...prev[semester]?.[month]?.[week],
            [task]: !prev[semester]?.[month]?.[week]?.[task]
          }
        }
      }
    }))
  }

  const completed = Object.values(
    progress[semester]?.[month]?.[week] || {}
  ).filter(Boolean).length

  const percentage =
    tasks.length === 0 ? 0 : (completed / tasks.length) * 100

  return (
    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-6">

      <ul className="space-y-3">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg">
            <input
              type="checkbox"
              checked={!!progress[semester]?.[month]?.[week]?.[task]}
              onChange={() => toggle(task)}
            />
            <span className={
              progress[semester]?.[month]?.[week]?.[task]
                ? "line-through text-slate-500"
                : ""
            }>
              {task}
            </span>
          </li>
        ))}
      </ul>

      <ProgressBar percentage={percentage} />

    </div>
  )
}