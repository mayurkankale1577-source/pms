import Dashboard from "@/components/Dashboard";
import AttendanceCalendar from "@/components/AttendanceCalendar";

import { getCurrentUser } from "@/lib/current-user";
import { getDashboardData } from "@/services/dashboard.service";
import { getCalendarData } from "@/services/calendar.service";

import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const user =
    await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const data =
    await getDashboardData(
      user.id
    );

  const calendarData =
    await getCalendarData(
      user.id
    );

  return (
    <div>
      <Dashboard
        casual={data.casual}
        earned={data.earned}
        attendance={
          data.attendance
        }
      />

      <AttendanceCalendar
        data={calendarData}
      />
    </div>
  );
}