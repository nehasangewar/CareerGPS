import { useContext, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../context/AppContext"

export default function LoginForm({ setMode }) {
  const { setIsAuthenticated, setUser } = useContext(AppContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    setUser({ email })
    setIsAuthenticated(true)
    navigate("/goal-entry")
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-600 outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-600 outline-none"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
      >
        Login
      </button>

      <button
        onClick={() => setMode("forgot")}
        className="text-sm text-slate-400 hover:text-blue-400"
      >
        Forgot Password?
      </button>
    </motion.div>
  )
}