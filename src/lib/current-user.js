import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { getUserByEmail } from "@/services/user.service";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    if (!token?.value) {
      return null;
    }

    const decoded = verifyToken(token.value);

    if (!decoded?.email) {
      return null;
    }

    const user = await getUserByEmail(
      decoded.email
    );

    return user || null;

  } catch (error) {

    console.log(
      "GET CURRENT USER ERROR:",
      error
    );

    return null;
  }
}