import Link from "next/link";
import React from "react";

const stats = [
  { title: "Total Exams", value: 25 },
  { title: "Total Students", value: 10 },
];

const recentActions = [
  { action: "Added new exam: Mathematics Final", time: "2 hours ago" },
  { action: "Updated questions for Physics Midterm", time: "Yesterday" },
  { action: "Removed student: John Doe", time: "3 days ago" },
];

export default function AdminDashboard() {
  return (
    <div className="flex-1 px-[5%] py-6 text-gray-900">
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-base font-medium lg:text-lg">{stat.title}</h2>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}

        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <h3 className="mb-2 text-base font-medium md:text-lg">
            Manage Exams
          </h3>
          <Link
            href={"/dashboard/exams"}
            className="mx-auto block w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm text-white duration-200 hover:bg-blue-600/90"
          >
            View Exams
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <h3 className="mb-2 text-base font-medium md:text-lg">
            Manage Results
          </h3>
          <Link
            href={"/dashboard/results"}
            className="mx-auto block w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm text-white duration-200 hover:bg-blue-600/90"
          >
            View Results
          </Link>
        </div>
      </section>

      {/* Recent Actions */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Recent Actions</h2>
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
          {recentActions.map((action, index) => (
            <div key={index} className="border-b pb-2">
              <p className="font-medium">{action.action}</p>
              <p className="text-sm text-gray-500">{action.time}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
