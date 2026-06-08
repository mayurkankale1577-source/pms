import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import { getCurrentUser } from "@/lib/current-user";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({
  children,
}) {
  const user = await getCurrentUser();

  return (
    <div className="h-screen bg-slate-100">

      <div className="flex h-full">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar user={user} />
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Sticky Header */}
          <header
            className="
              sticky
              top-0
              z-30
              h-24
              bg-white
              border-b
              border-slate-200
              shadow-sm
              px-8
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-4">

              <MobileSidebar user={user} />

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Project & Leave Management Suite
                </h1>

                <p className="text-sm text-slate-500">
                  Employee Management Portal
                </p>
              </div>

            </div>

            <div className="flex items-center gap-5">

              <div className="text-right">
                <h4 className="font-semibold text-slate-900">
                  {user?.name}
                </h4>

                <p className="text-sm text-slate-500 capitalize">
                  {user?.role}
                </p>
                <LogoutButton />
              </div>

          

            </div>
          </header>

          {/* Scrollable Content */}
          <main
            className="
              flex-1
              overflow-y-auto
              p-6
              lg:p-10
            "
          >
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}