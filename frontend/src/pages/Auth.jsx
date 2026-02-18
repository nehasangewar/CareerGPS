import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

export default function Auth() {
  const { setIsAuthenticated, setUser } = useContext(AppContext)
  const navigate = useNavigate()

  const [mode, setMode] = useState("login")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    college: "",
    university: "",
    branch: "",
    year: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = () => {
    setUser(form)
    setIsAuthenticated(true)
    navigate("/goal-entry")
  }

  const handleRegister = () => {
    setOtpSent(true)
  }

  const verifyOtp = () => {
    if (otp === "1234") {
      setUser(form)
      setIsAuthenticated(true)
      navigate("/goal-entry")
    } else {
      alert("Invalid OTP (Use 1234)")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="bg-slate-900 w-full max-w-md p-8 rounded-2xl border border-slate-800">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Career GPS
        </h1>

        <div className="flex justify-center gap-6 mb-6">
          <button onClick={() => setMode("login")}
            className={mode === "login" ? "text-blue-500" : "text-slate-400"}>
            Login
          </button>
          <button onClick={() => setMode("register")}
            className={mode === "register" ? "text-blue-500" : "text-slate-400"}>
            Register
          </button>
        </div>

        {mode === "login" && (
          <div className="space-y-4">
            <input name="email" placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <input name="password" type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 py-3 rounded-lg">
              Login
            </button>
          </div>
        )}

        {mode === "register" && !otpSent && (
          <div className="space-y-4">
            <input name="name" placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <input name="email" placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <input name="phone" placeholder="Phone"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <input name="college" placeholder="College"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <input name="university" placeholder="University"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <input name="branch" placeholder="Branch"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <input name="year" placeholder="Year"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <input name="password" type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <button
              onClick={handleRegister}
              className="w-full bg-blue-600 py-3 rounded-lg">
              Send OTP
            </button>
          </div>
        )}

        {mode === "register" && otpSent && (
          <div className="space-y-4">
            <input placeholder="Enter OTP (Use 1234)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 bg-slate-800 rounded-lg" />
            <button
              onClick={verifyOtp}
              className="w-full bg-blue-600 py-3 rounded-lg">
              Verify & Continue
            </button>
          </div>
        )}

      </div>
    </div>
  )
}