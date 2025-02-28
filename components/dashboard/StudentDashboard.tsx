import Link from "next/link";
import React from "react";
import { getExams } from "@/services/examServices";
import StudentExamsTable from "../exam/StudentExamsTable";
import { getSession } from "@/services/authServices";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const user = await getSession();
  if (!user) redirect("/login");

  const { data: exams } = await getExams();

  return (
    <div className="flex-1 px-[5%] py-6 text-gray-900">
      {/* Stats Section */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-base font-medium lg:text-lg">Total Exams</h2>
          <p className="mt-2 text-3xl font-semibold">12</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-base font-medium lg:text-lg">Upcoming Exams</h2>
          <p className="mt-2 text-3xl font-semibold">4</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-base font-medium lg:text-lg">Completed Exams</h2>
          <p className="mt-2 text-3xl font-semibold">8</p>
        </div>
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
