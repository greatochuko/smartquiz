import Link from "next/link";
import React from "react";
import { getExams } from "@/services/examServices";
import StudentExamsTable from "../exam/StudentExamsTable";
import { UserType } from "@/db/models/User";

const stats = [
  {
    title: "Total Exams",
    value: 12,
    className: "text-blue-600",
  },
  {
    title: "Upcoming Exams",
    value: 4,
    className: "text-amber-600",
  },
  {
    title: "Completed Exams",
    value: 7,
    className: "text-green-600",
  },
  {
    title: "Missed Exams",
    value: 1,
    className: "text-rose-600",
  },
];

export default async function StudentDashboard({ user }: { user: UserType }) {
  const { data: exams } = await getExams();

  return (
    <div className="flex-1 px-[5%] py-6 text-gray-900">
      {/* Stats Section */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`flex flex-col justify-between rounded-lg bg-white p-4 shadow lg:p-6 ${stat.className}`}
          >
            <h2 className="text-base font-medium lg:text-lg">{stat.title}</h2>
            <p className="mt-2 text-2xl font-medium sm:text-3xl">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      {/* Recent Exams */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-xl font-semibold">Recent Exams</h2>{" "}
          <Link
            href={"/dashboard/exams"}
            className="text-blue-600 hover:underline"
          >
            View all
          </Link>
        </div>
        <StudentExamsTable exams={exams.slice(0, 5)} userId={user._id} />
      </section>
    </div>
  );
}
