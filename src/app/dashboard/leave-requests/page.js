import Link from "next/link";

import {
  getCurrentUser,
} from "@/lib/current-user";

import {
  getLeaveBalance,
  getLeaveRequests,
} from "@/services/leave-request.service";

export default async function Page() {

  const user =
    await getCurrentUser();

  const balance =
    await getLeaveBalance(
      user.id
    );

  const requests =
    await getLeaveRequests(
      user.id
    );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      <div className="flex justify-between items-start">

        <div>

          <h1 className="text-4xl font-bold">
            Leave Requests
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your current and past leave requests.
          </p>

        </div>

        <Link
          href="/dashboard/leave-requests/new"
          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
          "
        >
          Create leave request
        </Link>

      </div>

      <div className="bg-white border rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-2">
          Leaves remaining
        </h2>

        <p className="text-slate-500 mb-6">
          Current year balance available for paid leave deduction.
        </p>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="border rounded-2xl p-4">
            Casual leaves remaining

            <span className="font-bold ml-3">
              {balance?.casual_leave ?? 0}
            </span>

          </div>

          <div className="border rounded-2xl p-4">
            Earned leaves remaining

            <span className="font-bold ml-3">
              {balance?.earned_leave ?? 0}
            </span>

          </div>

        </div>

      </div>

      <div className="bg-white border rounded-3xl overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            My Leave Requests
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="p-4 text-left">
                Leave Type
              </th>

              <th className="p-4 text-left">
                Date Range
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Reason
              </th>

            </tr>

          </thead>

          <tbody>

            {requests.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="p-6 text-center"
                >
                  No leave requests found.
                </td>

              </tr>

            ) : (

              requests.map(
                (request) => (

                  <tr
                    key={request.id}
                    className="border-t"
                  >

                    <td className="p-4 capitalize">
                      {request.leave_type}
                    </td>

                    <td className="p-4">

                      {new Date(
                        request.start_date
                      ).toLocaleDateString("en-GB")}

                      {" - "}

                      {new Date(
                        request.end_date
                      ).toLocaleDateString("en-GB")}

                    </td>

                    <td className="p-4 capitalize">
                      {request.status}
                    </td>

                    <td className="p-4">
                      {request.reason}
                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}