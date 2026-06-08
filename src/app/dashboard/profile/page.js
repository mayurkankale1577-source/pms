import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import ProfileForm from "@/components/ProfileForm";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfileForm user={user} />;
}