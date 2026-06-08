import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { getAllUsers } from "@/services/user.service";
export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const currentUser = await getCurrentUser();
   
  if (!currentUser) {
    redirect("/login");
  }
  
  if (currentUser.role !== "admin") {
    redirect("/dashboard");
  }

  const users = await getAllUsers();

  return (
    <div className="max-w-8xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Users
        </h1>

        <p className="text-slate-500 mt-2">
          Manage all registered users.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  ID
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Created At
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
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
                        user.role === "admin"
                          ? "px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
                          : "px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                      }
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      user.created_at
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}