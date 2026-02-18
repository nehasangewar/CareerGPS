import { createContext, useState, useEffect } from "react"

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [goal, setGoal] = useState("")
  const [branch, setBranch] = useState("")
  const [year, setYear] = useState("")
  const [progress, setProgress] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem("careerProgress")
    if (saved) setProgress(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("careerProgress", JSON.stringify(progress))
  }, [progress])

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      goal,
      setGoal,
      branch,
      setBranch,
      year,
      setYear,
      progress,
      setProgress
    }}>
      {children}
    </AppContext.Provider>
  )
}