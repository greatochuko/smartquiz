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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">Recent Exams</h2>{" "}
          <Link
            href={"/dashboard/exams"}
            className="hover:underline text-blue-600"
          >
            View all
          </Link>
        </div>
        <StudentExamsTable exams={exams.slice(0, 5)} userId={user._id} />
      </section>
    </div>
  );
}
