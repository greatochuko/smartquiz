import Course, { CourseType } from "@/db/models/Course";
import { parseJSONResponse } from "@/lib/utils";
import { getSession } from "./authServices";

export async function getCoursesByExaminer() {
  try {
    const user = await getSession();
    if (!user) throw new Error("Unauthenticated");

    const courses: CourseType[] = await Course.find({ user: user._id })
      .populate({
        path: "user",
        select: "firstName lastName",
      })
      .sort({ createdAt: -1 });
    return { data: parseJSONResponse(courses), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching courses: ", error.message);
    return { data: [], error: "An error occured fetching courses" };
  }
}

export async function getCourseById(courseId: string) {
  try {
    const user = await getSession();
    if (!user) throw new Error("Unauthenticated");

    const course: CourseType = await Course.findById(courseId).populate({
      path: "user",
      select: "firstName lastName",
    });
    return { data: parseJSONResponse(course), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching courses: ", error.message);
    return { data: null, error: "An error occured fetching courses" };
  }
}
