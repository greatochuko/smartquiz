import Link from "next/link";

const exams = [
  {
    id: 1,
    name: "Mathematics Midterm",
    date: "Feb 20, 2025",
    status: "Completed",
    students: 30,
  },
  {
    id: 2,
    name: "Physics Final",
    date: "Feb 25, 2025",
    status: "Upcoming",
    students: 25,
  },
  {
    id: 3,
    name: "Chemistry Quiz",
    date: "Mar 1, 2025",
    status: "Upcoming",
    students: 20,
  },
];

export default function ViewExams() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-4">Manage Exams</h1>
        <Link
          href={"/dashboard/exams/new"}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600/90 duration-200"
        >
          Create Exam
        </Link>
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-2 font-medium">Exam Name</th>
              <th className="text-left p-2 font-medium">Date</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-left p-2 font-medium">Students</th>
              <th className="text-left p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-b">
                <td className="p-2">{exam.name}</td>
                <td className="p-2">{exam.date}</td>
                <td
                  className={`p-2 ${
                    exam.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {exam.status}
                </td>
                <td className="p-2">{exam.students}</td>
                <td className="p-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-600/90 mr-2">
                    Edit
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-600/90">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-lg font-semibold">{exam.name}</h2>
            <p className="text-gray-600">Date: {exam.date}</p>
            <p
              className={`mt-2 font-medium ${
                exam.status === "Completed"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {exam.status}
            </p>
            <p className="text-gray-600">Students: {exam.students}</p>
            <div className="mt-2 flex gap-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
                Edit
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
