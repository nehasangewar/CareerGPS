import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "./context/AppContext"

import Auth from "./pages/Auth"
import GoalEntry from "./pages/GoalEntry"
import InterestQuiz from "./pages/InterestQuiz"
import RoadmapSetup from "./pages/RoadmapSetup"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const { isAuthenticated } = useContext(AppContext)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Routes>

        <Route path="/" element={<Auth />} />

        <Route
          path="/goal-entry"
          element={isAuthenticated ? <GoalEntry /> : <Navigate to="/" />}
        />

        <Route
          path="/interest-quiz"
          element={isAuthenticated ? <InterestQuiz /> : <Navigate to="/" />}
        />

        <Route
          path="/roadmap-setup"
          element={isAuthenticated ? <RoadmapSetup /> : <Navigate to="/" />}
        />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />

      </Routes>
    </div>
  )
}