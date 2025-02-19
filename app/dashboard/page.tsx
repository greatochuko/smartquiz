import AdminDashboard from "@/components/dashboard/AdminDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import { getSession } from "@/services/authServices";
import { notFound } from "next/navigation";

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) notFound();

  if (user.role === "Examiner") return <AdminDashboard />;

  return <StudentDashboard />;
}
