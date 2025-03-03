"use server";

import connectDB from "@/db/connectDB";
import Activity, { ActivityActionType } from "@/db/models/Activity";
import { parseJSONResponse } from "@/lib/utils";
import { getSession } from "@/services/authServices";

export async function createActivity<T extends ActivityActionType>(
  action: T,
  examId: string,
  studentId?: T extends "remove-student" | "register-student"
    ? string
    : undefined,
) {
  try {
    const user = await getSession();
    if (!user) throw new Error("User nor authenticated");

    await connectDB();

    const newActivity = await Activity.create({
      action,
      exam: examId,
      student: studentId,
      user: user._id,
    });
    return { activity: parseJSONResponse(newActivity), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error creating activity: ", error.message);
    return { activity: null, error: error.message };
  }
}
