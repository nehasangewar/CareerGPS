import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

export default function Onboarding() {
  const navigate = useNavigate()

  const { branch, setBranch, year, setYear, goal, setGoal } = useContext(AppContext)

  const isComplete = branch && year && goal

  return (
    <div className="min-h-screen text-white px-6 py-12 max-w-4xl mx-auto">

      <h2 className="text-4xl font-bold mb-10 text-center">
        Build Your Roadmap
      </h2>

      {/* Branch Selection */}
      <div className="mb-8">
        <h3 className="text-xl mb-4">Select Your Branch</h3>
        <div className="flex gap-4 flex-wrap">
          {["CSE", "IT", "AI"].map((item) => (
            <button
              key={item}
              onClick={() => setBranch(item)}
              className={`px-6 py-3 rounded-xl border ${
                branch === item
                  ? "bg-blue-600 border-blue-600"
                  : "border-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Year Selection */}
      <div className="mb-8">
        <h3 className="text-xl mb-4">Select Your Current Year</h3>
        <div className="flex gap-4 flex-wrap">
          {["1st Year", "2nd Year"].map((item) => (
            <button
              key={item}
              onClick={() => setYear(item)}
              className={`px-6 py-3 rounded-xl border ${
                year === item
                  ? "bg-blue-600 border-blue-600"
                  : "border-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Goal Selection */}
      <div className="mb-12">
        <h3 className="text-xl mb-4">Select Your Career Goal</h3>
        <div className="flex gap-4 flex-wrap">
          {["Software Developer", "Data Science", "Cybersecurity"].map((item) => (
            <button
              key={item}
              onClick={() => setGoal(item)}
              className={`px-6 py-3 rounded-xl border ${
                goal === item
                  ? "bg-blue-600 border-blue-600"
                  : "border-slate-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          disabled={!isComplete}
          onClick={() => navigate("/dashboard")}
          className={`px-8 py-4 rounded-xl text-lg font-semibold ${
            isComplete
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-slate-700 cursor-not-allowed"
          }`}
        >
          Generate My Roadmap
        </button>
      </div>

    </div>
  )
}