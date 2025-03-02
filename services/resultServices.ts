import connectDB from "@/db/connectDB";
import Result, { ResultType } from "@/db/models/Result";

export async function getResult(studentUserId: string, examId: string) {
  try {
    await connectDB();

    const result: ResultType | null = await Result.findOne({
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

export async function getResultById(resultId: string) {
  try {
    await connectDB();

    const result: ResultType | null = await Result.findById(resultId);
    if (!result) throw new Error("Invalid result Id");

    return { result: JSON.parse(JSON.stringify(result)), error: null };
  } catch (err) {
    const error = err as Error;
    console.log(`Error fetching result with ID "${resultId}": `, error.message);
    return { result: null, error: "An error occured fetching result" };
  }
}
