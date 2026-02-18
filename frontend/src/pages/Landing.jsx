import { useNavigate } from "react-router-dom"

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
        Stop Guessing Your Career.
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl">
        Career GPS gives you a semester-by-semester roadmap 
        so you know exactly what to focus on and what to ignore.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/onboarding")}
        className="mt-10 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition duration-200"
      >
        Create My Roadmap
      </button>

    </div>
  )
}