import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const questions = [
  {
    question: "Do you enjoy solving logical problems?",
    field: "logic"
  },
  {
    question: "Do you like analyzing data?",
    field: "data"
  },
  {
    question: "Do you enjoy building visual interfaces?",
    field: "ui"
  },
  {
    question: "Are you interested in cybersecurity concepts?",
    field: "security"
  }
]

export default function InterestQuiz() {
  const navigate = useNavigate()
  const { setGoal } = useContext(AppContext)

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const handleAnswer = (value) => {
    const updated = {
      ...answers,
      [questions[step].field]: value
    }

    setAnswers(updated)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      determineGoal(updated)
    }
  }

  const determineGoal = (data) => {
    if (data.logic && !data.data) {
      setGoal("Software Development")
    } else if (data.data) {
      setGoal("Data Analytics")
    } else if (data.security) {
      setGoal("Cybersecurity")
    } else {
      setGoal("Web Development")
    }

    navigate("/roadmap-setup")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-3xl font-semibold mb-12">
        {questions[step].question}
      </h2>

      <div className="flex gap-8">
        <button
          onClick={() => handleAnswer(true)}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg transition"
        >
          Yes
        </button>

        <button
          onClick={() => handleAnswer(false)}
          className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-xl text-lg transition"
        >
          No
        </button>
      </div>
    </div>
  )
}