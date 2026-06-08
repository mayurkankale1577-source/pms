import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import AddUserForm from "@/components/AddUserForm";

export default async function AddUserPage() {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== "admin") {
    redirect("/dashboard");
  }

  return <AddUserForm />;
}