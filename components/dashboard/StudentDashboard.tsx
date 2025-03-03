import Link from "next/link";
import React from "react";
import { getExams } from "@/services/examServices";
import StudentExamsTable from "../exam/StudentExamsTable";
import { UserType } from "@/db/models/User";
import { getExamStatus } from "@/lib/utils";

export default async function StudentDashboard({ user }: { user: UserType }) {
  const { data: exams } = await getExams();

  const totalExams = exams.filter((exam) =>
    exam.students.some((student) => student.user._id === user._id),
  ).length;

  const upcomingExams = exams.filter(
    (exam) =>
      exam.students.some((student) => student.user._id === user._id) &&
      getExamStatus(exam) === "not-due",
  ).length;

  const completedExams = exams.filter((exam) => {
    const studentInExam = exam.students.find(
      (student) => student.user._id === user._id,
    );
    return studentInExam && studentInExam.status === "submitted";
  }).length;

  const missedExams = totalExams - upcomingExams - completedExams;

  const stats = [
    {
      title: "Total Exams",
      value: totalExams,
      className: "text-blue-600",
    },
    {
      title: "Upcoming Exams",
      value: upcomingExams,
      className: "text-amber-600",
    },
    {
      title: "Completed Exams",
      value: completedExams,
      className: "text-green-600",
    },
    {
      title: "Missed Exams",
      value: missedExams,
      className: "text-rose-600",
    },
  ];

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
