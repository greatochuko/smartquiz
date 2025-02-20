import LogoutButton from "@/components/dashboard/LogoutButton";
import { getSession } from "@/services/authServices";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (!user) redirect("/login");

  return (
    <>
      <header className="bg-white shadow-md p-4 flex gap-4 items-center">
        <Link href={"/dashboard"} className="text-2xl font-semibold">
          Dashboard
        </Link>
        <p className="ml-auto">Hello, {user.firstName}</p>
        <LogoutButton />
      </header>
      {children}
    </>
  );
}
