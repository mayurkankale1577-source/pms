import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { getUserByEmail } from "@/services/user.service";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token.value);

    if (!decoded) {
      return null;
    }

    const user = await getUserByEmail(decoded.email);

    return user;
  } catch {
    return null;
  }
}