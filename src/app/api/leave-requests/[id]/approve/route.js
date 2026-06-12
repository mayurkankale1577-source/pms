import { NextResponse } from "next/server";

import {
  approveLeaveRequest,
} from "@/services/leave-request.service";

import {
  getCurrentUser,
} from "@/lib/current-user";

export async function POST(
  request,
  context
) {

  const { id } =
    await context.params;

  const user =
    await getCurrentUser();

  console.log(
    "REQUEST ID:",
    id
  );

  const result =
    await approveLeaveRequest(
      id,
      user.id
    );

  console.log(
    "APPROVE RESULT:",
    result
  );

  return NextResponse.json({
    success: true,
  });

}