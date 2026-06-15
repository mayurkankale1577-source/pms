export const dynamic = "force-dynamic";

import {
  getCurrentUser,
} from "@/lib/current-user";

import {
  getAllLeaveRequests,
} from "@/services/leave-request.service";

import LeaveActionButtons
from "@/components/LeaveActionButtons";

export default async function AllLeaveRequestsPage({
  searchParams,
}) {

  const params =
    await searchParams;

  const page =
    Number(params?.page) || 1;

  const limit = 10;

  const user =
    await getCurrentUser();

  if (!user) {
    return (
      <div>
        User not found
      </div>
    );
  }

  const {
    requests,
    total,
  } = await getAllLeaveRequests(
    page,
    limit
  );

  const totalPages =
    Math.ceil(total / limit);

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          All Leave Requests
        </h1>

        <p className="text-slate-500 mt-2">
          View all leave requests across the organization.
        </p>

      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Leave Requests
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Employee
                </th>

                <th className="text-left py-3">
                  Approver
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
                    colSpan="6"
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
                      {request.approver_name || "-"}
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

                      {request.status?.toLowerCase() === "pending" &&
                      (
                        user?.role === "admin" ||
                        user?.role === "team_leader"
                      ) ? (

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

        <div className="flex justify-center gap-2 mt-6">

          {Array.from(
            { length: totalPages },
            (_, i) => (
              <a
                key={i + 1}
                href={`/dashboard/all-leave-requests?page=${i + 1}`}
                className={`px-4 py-2 border rounded-lg ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </a>
            )
          )}

        </div>

      </div>

    </div>
  );
}