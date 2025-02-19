import LogoutButton from "@/components/dashboard/LogoutButton";
import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link href={"/dashboard"} className="text-2xl font-semibold">
          Dashboard
        </Link>
        <LogoutButton />
      </header>
      {children}
    </>
  );
}
