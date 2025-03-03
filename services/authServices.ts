import { UserType } from "@/db/models/User";
import { cookies } from "next/headers";

export async function getSession(): Promise<UserType | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${process.env.BASE_URL}/api/session`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const user = response.ok ? await response.json() : null;
    return user;
  } catch (error) {
    console.log("Error getting session: ", (error as Error).message);
    return null;
  }
}
