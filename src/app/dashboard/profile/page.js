import { getCurrentUser } from "@/lib/current-user";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return <ProfileForm user={user} />;
}