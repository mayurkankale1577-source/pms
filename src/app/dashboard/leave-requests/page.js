import Link from "next/link";

export default function Page() {

  const currentRequests = [];
  const pastRequests = [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Header */}
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

      {/* Leave Balance */}
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
              4.00
            </span>
          </div>

          <div className="border rounded-2xl p-4">
            Earned leaves remaining
            <span className="font-bold ml-3">
              36.72
            </span>
          </div>

        </div>

      </div>

      {/* Current Requests */}
      <div className="bg-white border rounded-3xl overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            Current requests
          </h2>

          <p className="text-slate-500 mt-2">
            Current includes active dates and all requests that are still actionable.
          </p>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">
                LEAVE BREAKUP
              </th>
              <th className="p-4 text-left">
                DATE RANGE
              </th>
              <th className="p-4 text-left">
                APPROVER
              </th>
              <th className="p-4 text-left">
                STATUS
              </th>
              <th className="p-4 text-left">
                NOTES
              </th>
              <th className="p-4 text-left">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                colSpan="6"
                className="p-6 text-center"
              >
                No current leave requests found.
              </td>
            </tr>
          </tbody>
        </table>

      </div>

      {/* Past Requests */}
      <div className="bg-white border rounded-3xl overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            Past requests
          </h2>

          <p className="text-slate-500 mt-2">
            Past includes inactive requests whose dates have passed.
          </p>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">
                LEAVE BREAKUP
              </th>
              <th className="p-4 text-left">
                DATE RANGE
              </th>
              <th className="p-4 text-left">
                APPROVER
              </th>
              <th className="p-4 text-left">
                STATUS
              </th>
              <th className="p-4 text-left">
                NOTES
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                colSpan="5"
                className="p-6 text-center"
              >
                No past leave requests found.
              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}