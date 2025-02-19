import React from "react";

const exams = [
  {
    name: "Mathematics Midterm",
    date: "Feb 20, 2025",
    status: "Completed",
    statusColor: "text-green-600",
  },
  {
    name: "Physics Final",
    date: "Feb 25, 2025",
    status: "Upcoming",
    statusColor: "text-yellow-600",
  },
];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-base lg:text-lg font-medium">Total Exams</h2>
          <p className="text-3xl font-semibold mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-base lg:text-lg font-medium">Upcoming Exams</h2>
          <p className="text-3xl font-semibold mt-2">4</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-base lg:text-lg font-medium">Completed Exams</h2>
          <p className="text-3xl font-semibold mt-2">8</p>
        </div>
      </section>

      {/* Recent Exams */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Exams</h2>
        <div className="bg-white p-6 rounded-lg shadow-md hidden sm:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Exam Name</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{exam.name}</td>
                  <td className="p-2">{exam.date}</td>
                  <td className={`p-2 ${exam.statusColor}`}>{exam.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden space-y-4">
          {exams.map((exam, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{exam.name}</h3>
              <p className="text-gray-600">Date: {exam.date}</p>
              <p className={`font-semibold ${exam.statusColor}`}>
                {exam.status}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
