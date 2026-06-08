import { getCurrentUser } from "@/lib/current-user";
import { updateProfile } from "@/services/user.service";

export async function PUT(request) {
  try {
    const body = await request.json();

    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await updateProfile(
      user.id,
      body
    );

    return Response.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}