import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import AddUserForm from "@/components/AddUserForm";
export const dynamic = "force-dynamic";

export default async function AddUserPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  if (currentUser?.role !== "admin") {
    redirect("/dashboard");
  }

  return <AddUserForm />;
}