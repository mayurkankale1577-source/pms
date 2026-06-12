import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";

import {
  createLeaveRequest,
} from "@/services/leave-request.service";

export async function POST(
  request
) {
  try {

    const user =
      await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const requestId =
      await createLeaveRequest({
        userId: user.id,
        leaveType:
          body.leaveType,
        startDate:
          body.startDate,
        endDate:
          body.endDate,
        totalDays:
          body.totalDays,
        reason:
          body.reason,
      });

    return NextResponse.json({
      success: true,
      requestId,
      message:
        "Leave request submitted",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message,
      },
      {
        status: 500,
      }
    );

  }
}