import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { getUsersPaginated } from "@/services/user.service";

import UsersTable from "@/components/UsersTable";

export const dynamic =
  "force-dynamic";

  export default async function UsersPage({
    searchParams,
  }) {
    const currentUser =
      await getCurrentUser();
  
    if (!currentUser) {
      redirect("/login");
    }
  
    if (currentUser.role !== "admin") {
      redirect("/dashboard");
    }
  
    const params =
      await searchParams;
  
    const page =
      Number(
        params?.page
      ) || 1;
  
    const limit = 10;

  const {
    users,
    total,
  } =
    await getUsersPaginated(
      page,
      limit
    );

  return (
    <UsersTable
      users={users}
      currentPage={page}
      totalUsers={total}
      limit={limit}
    />
  );
}