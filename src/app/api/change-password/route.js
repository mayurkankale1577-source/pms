import { getCurrentUser } from "@/lib/current-user";
import { changePassword } from "@/services/user.service";

export async function PUT(request) {
  try {
    const body = await request.json();

    const user =
      await getCurrentUser();

    await changePassword(
      user.id,
      body.currentPassword,
      body.newPassword
    );

    return Response.json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}