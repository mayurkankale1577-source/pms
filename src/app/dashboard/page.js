import Dashboard from "@/components/Dashboard";
import { getCurrentUser } from "@/lib/current-user";
import { getDashboardData } from "@/services/dashboard.service";

export default async function DashboardPage() {

  const user =
    await getCurrentUser();

  const data =
    await getDashboardData(
      user.id
    );

  return (
    <Dashboard
      casual={data.casual}
      earned={data.earned}
      attendance={data.attendance}
    />
  );
}