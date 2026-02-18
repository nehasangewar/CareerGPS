import Card from "../ui/Card"
import ProgressBar from "./ProgressBar"

export default function WeeklySection({
  weeks,
  selectedWeek,
  setSelectedWeek,
  weekTasks,
  completedTasks,
  selectedSemester,
  toggleTask,
  progressPercentage
}) {
  return (
    <Card>
      <h3 className="text-xl font-semibold mb-4">Weekly Plan</h3>

      <div className="flex gap-3 mb-6 flex-wrap">
        {Object.keys(weeks || {}).map((week) => (
          <button
            key={week}
            onClick={() => setSelectedWeek(week)}
            className={`px-4 py-2 rounded-lg ${
              selectedWeek === week
                ? "bg-blue-600"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            {week.toUpperCase()}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {weekTasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center gap-3 bg-slate-700 p-3 rounded-lg"
          >
            <input
              type="checkbox"
              checked={
                !!completedTasks[selectedSemester]?.[selectedWeek]?.[task]
              }
              onChange={() => toggleTask(task)}
              className="w-5 h-5"
            />
            <span
              className={
                completedTasks[selectedSemester]?.[selectedWeek]?.[task]
                  ? "line-through text-slate-400"
                  : ""
              }
            >
              {task}
            </span>
          </li>
        ))}
      </ul>

      <ProgressBar percentage={progressPercentage} />
    </Card>
  )
}