import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignJWT, jwtVerify, JWTPayload } from "jose";

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
