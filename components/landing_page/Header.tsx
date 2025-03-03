"use client";
import { UserType } from "@/db/models/User";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogoutButton from "../dashboard/LogoutButton";

export default function Header({ user }: { user?: UserType | null }) {
  const pathname = usePathname();

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (isAuthRoute) return null;

  if (pathname.startsWith("/dashboard"))
    return (
      <header className="flex items-center gap-4 bg-white px-[5%] py-4 shadow-sm">
        <Link href={"/dashboard"} className="text-xl font-semibold sm:text-2xl">
          Dashboard
        </Link>
        <p className="ml-auto">Hello, {user?.firstName}</p>
        <LogoutButton />
      </header>
    );

  return (
    <header className="bg-white shadow-md">
      <div className="screen-container flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold text-blue-600">SmartQuizz</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="hidden sm:block">
              <Link href="#features" className="hover:text-blue-600">
                Features
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link href="#about" className="hover:text-blue-600">
                About
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link href="#contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
            {user ? (
              <li>
                <Link
                  href="/dashboard"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
