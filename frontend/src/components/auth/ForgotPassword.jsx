import { motion } from "framer-motion"

export default function ForgotPassword({ setMode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-600 outline-none"
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition">
        Send Reset Link
      </button>

      <button
        onClick={() => setMode("login")}
        className="text-sm text-slate-400 hover:text-blue-400"
      >
        Back to Login
      </button>
    </motion.div>
  )
}