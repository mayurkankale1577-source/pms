import {
    getReportingManagers,
  } from "@/services/user.service";
  
  export async function GET() {
    const managers =
      await getReportingManagers();
  
    return Response.json(managers);
  }