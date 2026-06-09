import Link from "next/link";

export default function UsersTable({
  users,
  currentPage,
  totalUsers,
  limit,
}) {
  const totalPages =
    Math.ceil(
      totalUsers / limit
    );

  return (
    <div className="max-w-8xl mx-auto">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Users
        </h1>

        <p className="text-slate-500 mt-2">
          Manage all registered
          users.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>

                <th className="px-6 py-4 text-left">
                  ID
                </th>

                <th className="px-6 py-4 text-left">
                  Name
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

                <th className="px-6 py-4 text-left">
                  Role
                </th>

                <th className="px-6 py-4 text-left">
                  Created At
                </th>

              </tr>
            </thead>

            <tbody>

              {users.map(
                (user) => (
                  <tr
                    key={
                      user.id
                    }
                    className="border-b"
                  >
                    <td className="px-6 py-4">
                      {user.id}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {user.name}
                    </td>

                    <td className="px-6 py-4">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          user.role ===
                          "admin"
                            ? "px-3 py-1 rounded-full text-xs bg-green-100 text-green-700"
                            : "px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700"
                        }
                      >
                        {
                          user.role
                        }
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {new Date(
                        user.created_at
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        <div className="flex justify-center items-center gap-2 py-6">

          {currentPage >
            1 && (
            <Link
              href={`/dashboard/users?page=${
                currentPage -
                1
              }`}
              className="px-4 py-2 border rounded-lg"
            >
              Previous
            </Link>
          )}

          {Array.from(
            {
              length:
                totalPages,
            },
            (_, i) =>
              i + 1
          ).map((page) => (
            <Link
              key={page}
              href={`/dashboard/users?page=${page}`}
              className={`px-4 py-2 border rounded-lg ${
                currentPage ===
                page
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              {page}
            </Link>
          ))}

          {currentPage <
            totalPages && (
            <Link
              href={`/dashboard/users?page=${
                currentPage +
                1
              }`}
              className="px-4 py-2 border rounded-lg"
            >
              Next
            </Link>
          )}

        </div>

      </div>

    </div>
  );
}