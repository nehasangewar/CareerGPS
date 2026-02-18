export default function Button({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
        active
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-slate-700 hover:bg-slate-600"
      }`}
    >
      {children}
    </button>
  )
}