import Course, { CourseType } from "@/db/models/Course";
import { parseJSONResponse } from "@/lib/utils";
import { getSession } from "./authServices";

export async function getCoursesByExaminer() {
  try {
    const user = await getSession();
    if (!user) throw new Error("Unauthenticated");

    const exams: CourseType[] = await Course.find({ user: user._id })
      .populate({
        path: "students.user",
        select: "firstName lastName",
      })
      .sort({ createdAt: -1 });
    return { data: parseJSONResponse(exams), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching exams: ", error.message);
    return { data: [], error: "An error occured fetching exams" };
  }
}
