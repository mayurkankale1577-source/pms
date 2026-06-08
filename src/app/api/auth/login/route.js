import { cookies } from "next/headers";

import { loginUser } from "@/services/auth.service";

export async function POST(request) {
  try {
    const body = await request.json();

    const result = await loginUser(body);

    const cookieStore = await cookies();

    cookieStore.set("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return Response.json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 401,
      }
    );
  }
}