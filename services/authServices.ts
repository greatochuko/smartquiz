import connectDB from "@/db/connectDB";
import User, { UserType } from "@/db/models/User";
import { parseJSONResponse, verifyJWT } from "@/lib/utils";
import { cookies } from "next/headers";

export async function getSession(): Promise<UserType | null> {
  try {
    const cookieStore = await cookies();

    // Retrieve token from cookies
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Invalid Token");

    // Verify JWT token
    const payload = await verifyJWT(token);
    if (!payload || !payload.userId) {
      throw new Error("Unable to verify token");
    }

    // Fetch user from database
    await connectDB();
    const user = await User.findById(payload.userId).select("-password");
    if (!user) throw new Error("User not found");

    return parseJSONResponse(user);
  } catch (error) {
    console.log("Error getting session: ", (error as Error).message);
    return null;
  }
}

// export async function getSession2(): Promise<UserType | null> {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) throw new Error("Invalid Token");

//     const BASE_URL = process.env.BASE_URL;

//     const res = await fetch(`${BASE_URL}/api/session`, {
//       headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });
//     const { user, error } = await res.json();
//     if (error) throw new Error(error);
//     return user;
//   } catch (error) {
//     console.log("Error getting session: ", (error as Error).message);
//     return null;
//   }
// }
