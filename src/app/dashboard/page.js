import Dashboard from "@/components/Dashboard";
import { getCurrentUser } from "@/lib/current-user";
import { getDashboardData } from "@/services/dashboard.service";
import { redirect } from "next/navigation";
import AttendanceCalendar from "@/components/AttendanceCalendar";

export default async function DashboardPage() {

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const data =
    await getDashboardData(user.id);

  return (
    <div>
    <Dashboard
      casual={data.casual}
      earned={data.earned}
      attendance={data.attendance}
    />
   <AttendanceCalendar />
    </div>
  );
}