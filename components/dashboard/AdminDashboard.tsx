import { generateActivityMessage } from "@/lib/utils";
import { getActivitiesByUser } from "@/services/activityServices";
import { getExamsByExaminer } from "@/services/examServices";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";

export default async function AdminDashboard({ userId }: { userId: string }) {
  const { data: exams } = await getExamsByExaminer(userId);
  const { activities } = await getActivitiesByUser(userId);

  const allStudents = exams.flatMap((exam) =>
    exam.students.map((student) => student.user._id),
  );
  const uniqueStudents = Array.from(new Set(allStudents));

  const stats = [
    { title: "Total Exams", value: exams.length },
    { title: "Total Students", value: uniqueStudents.length },
  ];

  return (
    <div className="flex-1 px-[5%] py-6 text-gray-900">
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-md sm:gap-4 lg:p-6"
          >
            <h2 className="text-base font-medium lg:text-lg">{stat.title}</h2>
            <p className="text-2xl font-medium sm:text-3xl">{stat.value}</p>
          </div>
        ))}
        {/* <div className="flex flex-col gap-2 rounded-lg bg-white p-4 text-center shadow-md sm:gap-4 lg:p-6">
          <h3 className="text-base font-medium lg:text-lg">Manage Exams</h3>
          <Link
            href={"/dashboard/exams"}
            className="mx-auto block w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm text-white duration-200 hover:bg-blue-600/90"
          >
            View Exams
          </Link>
        </div> */}
        <div className="flex flex-col gap-2 rounded-lg bg-white p-4 text-center shadow-md sm:gap-4 lg:p-6">
          <h3 className="text-base font-medium lg:text-lg">Manage Courses</h3>
          <Link
            href={"/dashboard/courses"}
            className="mx-auto block w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm text-white duration-200 hover:bg-blue-600/90"
          >
            View Courses
          </Link>
        </div>

        <div className="flex flex-col gap-2 rounded-lg bg-white p-4 text-center shadow-md sm:gap-4 lg:p-6">
          <h3 className="text-base font-medium lg:text-lg">Manage Results</h3>
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
        <h2 className="mb-4 text-xl font-semibold">Recent Activities</h2>
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="border-b pb-2">
                <p className="font-medium">
                  {generateActivityMessage(activity)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-zinc-600">
              You haven&apos;t done any activities.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
