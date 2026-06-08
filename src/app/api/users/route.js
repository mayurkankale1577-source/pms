import { createUser } from "@/services/user.service";

export async function POST(request) {
  try {
    const body = await request.json();

    const result = await createUser(body);

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