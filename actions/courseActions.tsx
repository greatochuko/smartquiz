"use server";

import connectDB from "@/db/connectDB";
import { getSession } from "@/services/authServices";
import Course, { CourseType } from "@/db/models/Course";
import { parseJSONResponse } from "@/lib/utils";

export async function createCourse(name: string) {
  try {
    const user = await getSession();
    if (!user) throw new Error("Unauthorized");

    await connectDB();
    const newCourse: CourseType = await Course.create({
      name,
      user: user._id,
    });

    return { newCourse: parseJSONResponse(newCourse), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error creating course: ", error.message);
    return { newCourse: null, error: "An error occured creating new course" };
  }
}

export async function deleteCourse(courseId: string) {
  try {
    await connectDB();
    await Course.findByIdAndDelete(courseId);

    // await createActivity("delete-exam", courseId);

    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error deleting course: ", error.message);
    return { error: "An error occured deleting course" };
  }
}
