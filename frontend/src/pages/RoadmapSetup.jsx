import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

export default function RoadmapSetup() {
  const { goal, setGoal, setBranch, setYear } = useContext(AppContext)
  const navigate = useNavigate()

  const [localBranch, setLocalBranch] = useState("")
  const [localYear, setLocalYear] = useState("")

  const handleGenerate = () => {
    setBranch(localBranch)
    setYear(localYear)
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 w-full max-w-xl">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Confirm Your Roadmap
        </h2>

        <div className="space-y-6">

          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Career Goal"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
          />

          <select
            value={localBranch}
            onChange={(e) => setLocalBranch(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
          >
            <option value="">Select Branch</option>
            <option>CSE</option>
            <option>IT</option>
            <option>AI</option>
          </select>

          <select
            value={localYear}
            onChange={(e) => setLocalYear(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
          >
            <option value="">Select Year</option>
            <option>1st Year</option>
            <option>2nd Year</option>
          </select>

          <button
            onClick={handleGenerate}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
          >
            Generate Roadmap
          </button>

        </div>

      </div>
    </div>
  )
}