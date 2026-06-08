import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { markIn } from "@/services/dashboard.service";

export async function POST(request) {
  try {
    const user =
      await getCurrentUser();

    const {
      latitude,
      longitude,
      city,
    } = await request.json();

    await markIn(
      user.id,
      latitude,
      longitude,
      city
    );

    return NextResponse.json({
      success: true,
      message:
        "Marked in successfully",
    });
  } catch (error) {
    return NextResponse.json(
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