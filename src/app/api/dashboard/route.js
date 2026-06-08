 

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { getDashboardData } from "@/services/dashboard.service";

export async function GET() {

  const user =
    await getCurrentUser();

  const data =
    await getDashboardData(
      user.id
    );

  return NextResponse.json(data);
}