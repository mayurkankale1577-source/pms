import {
  getCurrentUser,
} from "@/lib/current-user";
import LeaveActionButtons
from "@/components/LeaveActionButtons";

import {
  getTeamLeaveRequests,
} from "@/services/leave-request.service";

export default async function TeamLeaveRequestsPage() {

  const user =
    await getCurrentUser();

  const requests =
    await getTeamLeaveRequests(
      user.id
    );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold">
          Team Leave Requests
        </h1>

        <p className="text-slate-500 mt-2">
          Review and manage leave requests submitted by your team members.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Pending Requests
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b">

                <th className="text-left py-3">
                  Employee
                </th>

                <th className="text-left py-3">
                  Date Range
                </th>

                <th className="text-left py-3">
                  Leave Type
                </th>

                <th className="text-left py-3">
                  Status
                </th>

                <th className="text-left py-3">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {requests.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-slate-500"
                  >
                    No leave requests found.
                  </td>
                </tr>

              ) : (
                requests.map((request) => (

                  <tr
                    key={request.id}
                    className="border-b"
                  >
                
                    <td className="py-4">
                      {request.employee_name}
                    </td>
                
                    <td className="py-4">
                      {new Date(
                        request.start_date
                      ).toLocaleDateString("en-GB")}
                      {" - "}
                      {new Date(
                        request.end_date
                      ).toLocaleDateString("en-GB")}
                    </td>
                
                    <td className="py-4 capitalize">
                      {request.leave_type}
                    </td>
                
                    <td className="py-4 capitalize">
                      {request.status}
                    </td>
                
                    <td className="py-4">
                
                      {request.status?.toLowerCase() === "pending" ? (
                
                        <LeaveActionButtons
                          requestId={request.id}
                        />
                
                      ) : (
                        "-"
                      )}
                
                    </td>
                
                  </tr>
                
                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}