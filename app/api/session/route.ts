import { NextRequest, NextResponse } from "next/server";
import User from "@/db/models/User";
import { verifyJWT } from "@/lib/utils";
import connectDB from "@/db/connectDB";

export async function GET(req: NextRequest) {
  try {
    // Retrieve token from cookies
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { user: null, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify JWT token
    const payload = await verifyJWT(token);
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { user: null, error: "Invalid token" },
        { status: 401 }
      );
    }

    // Connect to DB
    await connectDB();

    // Fetch user from database
    const user = await User.findById(payload.userId).select("-password");
    if (!user) {
      return NextResponse.json(
        { user: null, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user, error: null }, { status: 200 });
  } catch (error) {
    console.error("Error in getSession API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
