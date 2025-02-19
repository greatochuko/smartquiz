import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignJWT, jwtVerify, JWTPayload } from "jose";

export async function signJWT(payload: JWTPayload, expiresIn: string = "1d") {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error("Please specify a JWT_SECRET in the environment variables");
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(secret);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secretKey);

  return jwt;
}

export async function verifyJWT(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error("Please specify a JWT_SECRET in the environment variables");
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(secret);

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
