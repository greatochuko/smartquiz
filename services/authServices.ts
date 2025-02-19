import { UserType } from "@/db/models/User";
import { cookies } from "next/headers";

export async function getSession(): Promise<UserType | null> {
  try {
    const BASE_URL = process.env.BASE_URL;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error("Invalid Token");

    const res = await fetch(`${BASE_URL}/api/session`, {
      headers: { Authorization: `Bearer ${token || undefined}` },
    });
    const { user, error } = await res.json();
    if (error) throw new Error(error);
    return user;
  } catch (err) {
    const error = err as Error;
    console.log("Error getting session: ", error.message);
    return null;
  }
}
