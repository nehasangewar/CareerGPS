import { useNavigate } from "react-router-dom"

export default function GoalEntry() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold mb-10">
        Do you know your career goal?
      </h2>

      <div className="flex gap-6">
        <button
          onClick={() => navigate("/roadmap-setup")}
          className="px-8 py-4 bg-blue-600 rounded-xl">
          Yes
        </button>
        <button
          onClick={() => navigate("/interest-quiz")}
          className="px-8 py-4 bg-slate-700 rounded-xl">
          Not Sure
        </button>
      </div>
    </div>
  )
}