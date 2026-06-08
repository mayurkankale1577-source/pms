"use client";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  };

  return (
   
<button
  className="
    px-5
    py-2.5
    rounded-xl
    bg-blue-600
    text-white
    font-medium
    hover:bg-blue-700
    transition
  "
  onClick={handleLogout}
>
  Logout
</button>
  );
}