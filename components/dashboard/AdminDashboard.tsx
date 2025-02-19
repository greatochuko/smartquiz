import Link from "next/link";
import React from "react";

const stats = [
  { title: "Total Exams", value: 25 },
  { title: "Total Students", value: 120 },
  { title: "Total Examiners", value: 10 },
];

const recentActions = [
  { action: "Added new exam: Mathematics Final", time: "2 hours ago" },
  { action: "Updated questions for Physics Midterm", time: "Yesterday" },
  { action: "Removed student: John Doe", time: "3 days ago" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Statistics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-base lg:text-lg font-medium">{stat.title}</h2>
            <p className="text-3xl font-semibold mt-2">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Management Section */}
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-base md:text-lg font-medium mb-2">
            Manage Exams
          </h3>
          <Link
            href={"/dashboard/exams"}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600/90 duration-200"
          >
            View Exams
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-base md:text-lg font-medium mb-2">
            Manage Questions
          </h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600/90 duration-200">
            View Questions
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-base md:text-lg font-medium mb-2">
            Manage Users
          </h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600/90 duration-200">
            View Users
          </button>
        </div>
      </section>

      {/* Recent Actions */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Actions</h2>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {recentActions.map((action, index) => (
            <div key={index} className="border-b pb-2">
              <p className="font-medium">{action.action}</p>
              <p className="text-gray-500 text-sm">{action.time}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
