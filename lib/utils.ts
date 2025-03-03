import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { startOfDay, isAfter, isBefore } from "date-fns";
import { ExamType } from "@/db/models/Exam";

export async function signJWT(payload: JWTPayload, expiresIn: string = "1d") {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret)
      throw new Error(
        "Please specify a JWT_SECRET in the environment variables",
      );
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);

    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(expiresIn)
      .sign(secretKey);

    return jwt;
  } catch (err) {
    const error = err as Error;
    console.error("JWT encryption failed:", error.message);
    return null;
  }
}

export async function verifyJWT(token: string) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret)
      throw new Error(
        "Please specify a JWT_SECRET in the environment variables",
      );
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);

    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (err) {
    const error = err as Error;
    console.error("JWT verification failed:", error.message);
    return null;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseJSON<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

type ExamStatusType = "passed" | "not-due" | "ready";

export function getExamStatus(exam: ExamType): ExamStatusType {
  let examStatus: ExamStatusType;

  const examDate = startOfDay(new Date(exam.date));
  const today = startOfDay(new Date());

  if (isBefore(examDate, today)) {
    examStatus = "passed";
  } else if (isAfter(examDate, today)) {
    examStatus = "not-due";
  } else {
    examStatus = "ready";
  }

  return examStatus;
}

export function getGrade(percentage: number) {
  if (percentage >= 70) {
    return "A";
  } else if (percentage >= 60) {
    return "B";
  } else if (percentage >= 50) {
    return "C";
  } else if (percentage >= 55) {
    return "D";
  } else if (percentage >= 50) {
    return "E";
  } else {
    return "F";
  }
}
