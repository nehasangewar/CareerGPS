export default function Sidebar({
  semesters,
  selectedSemester,
  setSelectedSemester,
  setSelectedWeek
}) {
  return (
    <div className="w-64 bg-slate-800 p-6 hidden md:block">
      <h3 className="text-xl font-semibold mb-6">Semesters</h3>

      {semesters.map((sem) => (
        <button
          key={sem}
          onClick={() => {
            setSelectedSemester(sem)
            setSelectedWeek("week1")
          }}
          className={`block w-full text-left px-4 py-3 rounded-lg mb-3 transition ${
            selectedSemester === sem
              ? "bg-blue-600"
              : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          {sem.toUpperCase()}
        </button>
      ))}
    </div>
  )
}