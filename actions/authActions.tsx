"use server";

import connectDB from "@/db/connectDB";
import User, { UserType } from "@/db/models/User";
import { signJWT } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function signup(userData: Partial<UserType>) {
  let canRedirect = false;
  try {
    await connectDB();
    const userExists = await User.findOne({ email: userData.email });
    if (userExists)
      return { data: null, error: "User with email already exists" };

    const encryptedPassword = await bcrypt.hash(userData.password!, 10);
    userData.password = encryptedPassword;

    const newUser = await User.create(userData);
    const token = await signJWT({ userId: newUser._id });
    if (!token) throw new Error("Error signing token");

    const cookieStore = await cookies();
    cookieStore.set("token", token);
    canRedirect = true;
  } catch (err) {
    const error = err as Error;
    console.log("Error creating  new user:", error.message);
    return { data: null, error: "An error occured creating new user" };
  } finally {
    if (canRedirect) redirect("/dashboard");
  }
}

export async function login(email: string, password: string) {
  let canRedirect = false;
  try {
    console.log("Inside login");

    await connectDB();
    const user = await User.findOne({ email: email });
    if (!user)
      return {
        data: null,
        error: "Invalid username and password combination",
      };

    console.log("User found");

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect)
      return { data: null, error: "Invalid username and password combination" };

    console.log("Password correct");

    const token = await signJWT({ userId: user._id });
    if (!token) throw new Error("Error signing token");

    console.log("Token signed");

    const cookieStore = await cookies();
    cookieStore.set("token", token);
    canRedirect = true;

    console.log("Cookie set");
  } catch (err) {
    console.log("Error encountered");

    const error = err as Error;
    console.log("Error creating  new user:", error.message);
    return { data: null, error: "An error occured creating new user" };
  } finally {
    if (canRedirect) redirect("/dashboard");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/", "layout");
  redirect("/login");
}
