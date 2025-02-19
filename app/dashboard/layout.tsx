import LogoutButton from "@/components/dashboard/LogoutButton";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <LogoutButton />
      </header>
      {children}
    </>
  );
}
