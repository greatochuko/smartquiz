import { UserType } from "@/db/models/User";
import { cookies } from "next/headers";

export async function getSession(): Promise<UserType | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error("Invalid Token");

    const BASE_URL = process.env.BASE_URL;

    const res = await fetch(`${BASE_URL}/api/session`, {
      headers: { Authorization: `Bearer ${token || undefined}` },
    });
    const { user, error } = await res.json();
    if (error) throw new Error(error);
    return user;
  } catch (error) {
    console.log("Error getting session: ", (error as Error).message);
    return null;
  }
}
