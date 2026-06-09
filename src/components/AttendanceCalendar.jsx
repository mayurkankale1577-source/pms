"use client";

import { useState } from "react";

export default function AttendanceCalendar({
  data = [],
}) {
  const today = new Date();

  const [currentDate, setCurrentDate] =
    useState(new Date());

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  const monthName =
    currentDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    );

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const weekDays = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];

  const previousMonth = () => {
    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    );
  };

  const getStatus = (day) => {
    const dateString =
      `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(
        2,
        "0"
      )}`;

    const record = data.find(
      (item) =>
        item.date === dateString
    );

    return record?.status || null;
  };

  const getClassName = (
    day,
    status
  ) => {
    const currentCellDate =
      new Date(
        year,
        month,
        day
      );

    const isWeekend =
      currentCellDate.getDay() ===
        0 ||
      currentCellDate.getDay() ===
        6;

    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year ===
        today.getFullYear();

    if (isToday) {
      return "bg-blue-100 border-blue-200";
    }

    if (status === "present") {
      return "bg-green-100 border-green-300";
    }

    if (status === "absent") {
      return "bg-red-100 border-red-300";
    }

    if (
      status ===
      "approved_leave"
    ) {
      return "bg-orange-100 border-orange-300";
    }

    if (isWeekend) {
      return "bg-purple-100 border-purple-200";
    }

    return "bg-white";
  };

  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-8
        shadow-sm
        mt-8
        max-w-7xl
        mx-auto
      "
    >
      {/* Header */}

      <div className="mb-6">
        <h3 className="text-3xl font-bold">
          Attendance Calendar
        </h3>

        <p className="text-slate-500 mt-2">
          Monthly attendance overview
        </p>
      </div>

      {/* Legend */}

      <div className="flex flex-wrap gap-5 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-200" />
          Present
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-200" />
          Absent
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-orange-200" />
          Approved Leave
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-200" />
          Weekend
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-200" />
          Today
        </div>
      </div>

      {/* Month Navigation */}

      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={previousMonth}
          className="
            w-10 h-10
            rounded-full
            border
            flex
            items-center
            justify-center
            hover:bg-slate-100
            transition
          "
        >
          {"<"}
        </button>

        <div
          className="
            px-6 py-2
            rounded-full
            border
            font-semibold
          "
        >
          {monthName} {year}
        </div>

        <button
          onClick={nextMonth}
          className="
            w-10 h-10
            rounded-full
            border
            flex
            items-center
            justify-center
            hover:bg-slate-100
            transition
          "
        >
          {">"}
        </button>
      </div>

      {/* Week Header */}

      <div className="grid grid-cols-7 gap-3 mb-3">
        {weekDays.map((day) => (
          <div
            key={day}
            className="
              text-center
              font-semibold
              text-slate-500
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}

      <div className="grid grid-cols-7 gap-3">
        {Array.from({
          length: firstDay,
        }).map((_, index) => (
          <div
            key={`empty-${index}`}
          />
        ))}

        {Array.from({
          length: daysInMonth,
        }).map((_, index) => {
          const day =
            index + 1;

          const status =
            getStatus(day);

          return (
            <div
              key={day}
              className={`
                h-24
                rounded-2xl
                border
                p-3
                text-right
                font-medium
                transition
                ${getClassName(
                  day,
                  status
                )}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}