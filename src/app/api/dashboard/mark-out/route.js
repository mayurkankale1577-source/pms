import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { markOut } from "@/services/dashboard.service";

export async function POST() {
  try {
    const user =
      await getCurrentUser();

    await markOut(user.id);

    return NextResponse.json({
      success: true,
      message:
        "Marked out successfully",
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