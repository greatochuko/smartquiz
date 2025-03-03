import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import User from "@/db/models/User";
import { parseJSONResponse, verifyJWT } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 },
      );
    }
    const token = authHeader.split(" ")[1];

    if (!token)
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });

    const payload = await verifyJWT(token);
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { error: "Unable to verify token" },
        { status: 401 },
      );
    }

    await connectDB();
    const user = await User.findById(payload.userId).select("-password");
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(parseJSONResponse(user));
  } catch (error) {
    console.error("Error getting session:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
