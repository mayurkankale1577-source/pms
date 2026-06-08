"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { FiMenu, FiX } from "react-icons/fi";

export default function MobileSidebar({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          lg:hidden
          p-2
          text-2xl
        "
      >
        <FiMenu />
      </button>

      {open && (
        <>
          <div
            className="
              fixed
              inset-0
              bg-black/40
              z-40
            "
            onClick={() => setOpen(false)}
          />

          <div
            className="
              fixed
              left-0
              top-0
              h-full
              z-50
            "
          >
            <div className="relative">
              <button
                onClick={() => setOpen(false)}
                className="
                  absolute
                  right-4
                  top-4
                  text-white
                  text-2xl
                "
              >
                <FiX />
              </button>

              <Sidebar user={user} />
            </div>
          </div>
        </>
      )}
    </>
  );
}