"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FiCalendar,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

export default function Dashboard({
  casual = 0,
  earned = 0,
  attendance = {},
}) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768;

  const handleMarkIn = () => {

    if (isMobile) {
      alert(
        "Attendance allowed only from Desktop/Laptop"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          setLoading(true);

          const response =
            await fetch(
              "/api/dashboard/mark-in",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  latitude:
                    position.coords.latitude,

                  longitude:
                    position.coords.longitude,

                  city: "Pune",
                }),
              }
            );

          const data =
            await response.json();

          alert(data.message);

          if (data.success) {
            router.refresh();
          }

        } catch {
          alert("Mark In Failed");
        } finally {
          setLoading(false);
        }

      },

      () => {
        alert(
          "Please enable location access"
        );
      }
    );
  };

  const handleMarkOut =
    async () => {

      if (isMobile) {
        alert(
          "Attendance allowed only from Desktop/Laptop"
        );
        return;
      }

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/dashboard/mark-out",
            {
              method: "POST",
            }
          );

        const data =
          await response.json();

        alert(data.message);

        if (data.success) {
          router.refresh();
        }

      } catch {
        alert("Mark Out Failed");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-start mb-8">

        <div>
          <h1 className="text-5xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2 text-lg">
            Combined delivery, billing,
            attendance and leave overview.
          </p>
        </div>

        <Link
          href="/dashboard/leave-requests"
          className="
            bg-white
            border
            border-slate-300
            px-6
            py-3
            rounded-xl
            font-medium
            hover:bg-slate-50
            transition
          "
        >
          Manage leave requests
        </Link>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* Casual Leave */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <span className="text-slate-500 text-sm">
              Casual leaves remaining
            </span>

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FiCalendar
                size={20}
                className="text-blue-600"
              />
            </div>

          </div>

          <h2 className="text-5xl font-bold mt-5">
            {parseFloat(
              casual || 0
            ).toFixed(2)}
          </h2>

        </div>

        {/* Earned Leave */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <span className="text-slate-500 text-sm">
              Earned leaves remaining
            </span>

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FiCalendar
                size={20}
                className="text-blue-600"
              />
            </div>

          </div>

          <h2 className="text-5xl font-bold mt-5">
            {parseFloat(
              earned || 0
            ).toFixed(2)}
          </h2>

        </div>

        {/* Mark In */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <span className="text-slate-500 text-sm">
              Today Mark-In
            </span>

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FiClock
                size={20}
                className="text-blue-600"
              />
            </div>

          </div>

          <h2 className="text-3xl font-bold mt-5">
            {attendance?.mark_in || "--"}
          </h2>

        </div>

        {/* Mark Out */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between items-center">

            <span className="text-slate-500 text-sm">
              Today Mark-Out
            </span>

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <FiClock
                size={20}
                className="text-blue-600"
              />
            </div>

          </div>

          <h2 className="text-3xl font-bold mt-5">
            {attendance?.mark_out || "--"}
          </h2>

        </div>

      </div>

      {/* Geo Rule */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-8">

        <div className="flex items-center gap-3 mb-3">

          <FiMapPin
            size={20}
            className="text-slate-700"
          />

          <h3 className="font-semibold text-lg">
            Geo Detection Rule
          </h3>

        </div>

        <p className="text-slate-600">
          Attendance actions work only when browser geolocation is enabled.
          Any attendance attempt without valid geolocation will sign you out.
        </p>

      </div>

      {/* Attendance */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h3 className="text-3xl font-bold">
              Attendance
            </h3>

            <p className="text-slate-500">
              Daily Attendance Tracking
            </p>

          </div>

          {isMobile ? (

<div
  className="
    border
    border-amber-300
    bg-amber-50
    text-amber-700
    rounded-2xl
    px-4
    py-3
    max-w-md
  "
>
  Attendance actions are available only on
  desktop, laptop, or MacBook browsers.
</div>

) : (

<div className="flex gap-3">

  <button
    onClick={handleMarkIn}
    disabled={
      loading ||
      attendance?.mark_in
    }
    className="
      px-6 py-3
      rounded-xl
      bg-slate-200
      font-semibold
      disabled:opacity-50
    "
  >
    Mark-In
  </button>

  <button
    onClick={handleMarkOut}
    disabled={
      loading ||
      !attendance?.mark_in ||
      attendance?.mark_out
    }
    className="
      px-6 py-3
      rounded-xl
      bg-slate-900
      text-white
      font-semibold
      disabled:opacity-50
    "
  >
    Mark-Out
  </button>

</div>

)}

        </div>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="border rounded-2xl p-5">

            <p className="text-slate-500">
              IN TIME
            </p>

            <h4 className="text-xl font-bold mt-2">
              {attendance?.mark_in || "--"}
            </h4>

          </div>

          <div className="border rounded-2xl p-5">

            <p className="text-slate-500">
              OUT TIME
            </p>

            <h4 className="text-xl font-bold mt-2">
              {attendance?.mark_out || "--"}
            </h4>

          </div>

          <div className="border rounded-2xl p-5">

            <p className="text-slate-500">
              CITY
            </p>

            <h4 className="text-xl font-bold mt-2">
              {attendance?.city || "--"}
            </h4>

          </div>

        </div>

      </div>

    </div>
  );
}