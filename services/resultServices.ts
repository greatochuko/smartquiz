import connectDB from "@/db/connectDB";
import Result, { ResultType } from "@/db/models/Result";
import "@/db/models/Exam";
import { parseJSON } from "@/lib/utils";

export async function getResult(studentUserId: string, examId: string) {
  try {
    await connectDB();

    const result: ResultType | null = await Result.findOne({
      student: studentUserId,
      exam: examId,
    });
    if (!result) throw new Error("Result not found");

    return { result: parseJSON(result), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching result: ", error.message);
    return { result: null, error: "An error occured fetching result" };
  }
}

export async function getResultById(resultId: string) {
  try {
    await connectDB();

    const result: ResultType | null =
      await Result.findById(resultId).populate("student exam");
    if (!result) throw new Error("Invalid result Id");

    return { result: parseJSON(result), error: null };
  } catch {
    return { result: null, error: "An error occured fetching result" };
  }
}

export async function getExaminerResults(userId: string) {
  try {
    await connectDB();

    const results: ResultType[] = await Result.find({
      examiner: userId,
    }).populate("student exam");

    return { results: parseJSON(results), error: null };
  } catch {
    return { results: [], error: "An error occured fetching result" };
  }
}
