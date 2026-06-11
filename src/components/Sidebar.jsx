import Link from "next/link";
import LogoutButton from "./LogoutButton";

import {
  FiHome,
  FiUser,
  FiLock,
  FiUsers,
  FiUserPlus,
  FiCalendar,
  FiClipboard,
} from "react-icons/fi";

export default function Sidebar({ user }) {
  return (
    <aside className="w-[260px] min-h-screen bg-[#020b2d] text-white">
      
      <div className="p-6 border-b border-white/10">

        <div className="text-xs tracking-[4px] text-[#8fa2c7] mb-4">
          BILLING SYSTEM
        </div>

        <div className="text-base font-bold leading-6">
          Project & Leave
          <br />
          Management Suite
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-semibold">
            {user?.name}
          </h4>

          <p className="text-[#9fb1d8] text-sm">
            {user?.role?.toUpperCase()}
          </p>
        </div>

      </div>

      <div className="p-5">

        <ul className="space-y-2">

          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
            >
              <FiHome size={18} />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
            >
              <FiUser size={18} />
              <span>My Profile</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/change-password"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
            >
              <FiLock size={18} />
              <span>Change Password</span>
            </Link>
          </li>

          {user?.role === "admin" && (
            <>
              <li>
                <Link
                  href="/dashboard/users"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
                >
                  <FiUsers size={18} />
                  <span>Users</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/add-user"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
                >
                  <FiUserPlus size={18} />
                  <span>Add User</span>
                </Link>
              </li>
            </>
          )}



{["admin", "hr"].includes(user?.role) && (
  <li>
    <Link
      href="/dashboard/all-leave-requests"
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
    >
           <FiClipboard size={18} />
      <span>All Leave Requests</span>
    </Link>
  </li>
)}

{user?.role === "team_leader" && (
  <li>
    <Link
      href="/dashboard/team-leave-requests"
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
    >
      <FiClipboard size={18} />
      <span>Team Leave Requests</span>
    </Link>
  </li>
)}

        </ul>

        

      </div>
    </aside>
  );
}