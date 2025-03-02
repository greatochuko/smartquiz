import connectDB from "@/db/connectDB";
import Result, { ResultType } from "@/db/models/Result";
import "@/db/models/Exam";

export async function getResult(
  studentUserId: string,
  examId: string,
): Promise<
  | {
      result: ResultType;
      error: null;
    }
  | {
      result: null;
      error: string;
    }
> {
  try {
    await connectDB();

    const result = await Result.findOne({
      student: studentUserId,
      exam: examId,
    });
    if (!result) throw new Error("Result not found");

    return { result: JSON.parse(JSON.stringify(result)), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching result: ", error.message);
    return { result: null, error: "An error occured fetching result" };
  }
}

export async function getResultById(resultId: string): Promise<
  | {
      result: ResultType;
      error: null;
    }
  | {
      result: null;
      error: string;
    }
> {
  try {
    await connectDB();

    const result = await Result.findById(resultId).populate("student exam");
    if (!result) throw new Error("Invalid result Id");

    return { result: JSON.parse(JSON.stringify(result)), error: null };
  } catch {
    return { result: null, error: "An error occured fetching result" };
  }
}
