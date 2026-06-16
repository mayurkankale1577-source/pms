import { createUser } from "@/services/user.service";
import { getCurrentUser } from "@/lib/current-user";

export async function POST(request) {
  try {

    const currentUser =
      await getCurrentUser();

    if (
      !currentUser ||
      currentUser.role !== "admin"
    ) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    const body =
      await request.json();

    const result =
      await createUser(body);

    return Response.json({
      success: true,
      data: result,
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