export default function ProgressBar({ percentage }) {
  return (
    <div className="w-full bg-slate-700 h-3 rounded-full">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}