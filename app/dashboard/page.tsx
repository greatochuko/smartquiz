import AdminDashboard from "@/components/dashboard/AdminDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import { getSession } from "@/services/authServices";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect("/login");

  if (user.role === "Examiner") return <AdminDashboard userId={user._id} />;

  return <StudentDashboard user={user} />;
}
