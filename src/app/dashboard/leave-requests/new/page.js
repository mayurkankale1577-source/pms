"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {

  const [form, setForm] =
    useState({
      approver: "",
      diwaliLeave: false,
      startDate: "",
      endDate: "",
      duration:
        "All working days - Full day",
      reason: "",
    });

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      console.log(form);

      alert(
        "Leave Request Submitted"
      );
    };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div className="flex justify-between items-start mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Create Leave Request
          </h1>

          <p className="text-slate-500 mt-2">
            Create a new leave request for approval.
          </p>

        </div>

        <Link
          href="/dashboard/leave-requests"
          className="
            border
            border-slate-300
            px-6
            py-3
            rounded-xl
            hover:bg-slate-50
          "
        >
          Back to Leave Requests
        </Link>

      </div>

      {/* Card */}

      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-8
          shadow-sm
        "
      >

        <h2 className="text-3xl font-bold mb-2">
          Create leave request
        </h2>

        <p className="text-slate-500 mb-6">
          Submit leave for approval.
          Leave deduction is automatically applied
          from casual leaves, then earned leaves.
        </p>

        {/* Leave Balance */}

        <div
          className="
            bg-slate-50
            border
            rounded-2xl
            p-5
            mb-8
          "
        >

          <h3 className="font-semibold">
            Leaves remaining
          </h3>

          <p className="mt-2">
            Casual:
            <span className="font-bold">
              {" "}4.00
            </span>

            {" • "}

            Earned:
            <span className="font-bold">
              {" "}36.72
            </span>
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Approver */}

          <div>

            <label className="block mb-2 font-medium">
              Approver
            </label>

            <select
              value={form.approver}
              onChange={(e) =>
                setForm({
                  ...form,
                  approver:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            >
              <option value="">
                Select Approver
              </option>

              <option>
                Anita Babu
              </option>

              <option>
                Urmila
              </option>

              <option>
                Shital
              </option>

            </select>

          </div>

          {/* Diwali */}

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={
                form.diwaliLeave
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  diwaliLeave:
                    e.target.checked,
                })
              }
            />

            <label>
              Diwali Leave
            </label>

          </div>

          {/* Dates */}

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 font-medium">
                Start Date
              </label>

              <input
                type="date"
                value={
                  form.startDate
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    startDate:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                "
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                End Date
              </label>

              <input
                type="date"
                value={
                  form.endDate
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    endDate:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                "
              />

            </div>

          </div>

          {/* Duration */}

          <div>

            <label className="block mb-2 font-medium">
              Leave Duration
            </label>

            <select
              value={
                form.duration
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  duration:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            >
              <option>
                All working days - Full day
              </option>

              <option>
                First Half
              </option>

              <option>
                Second Half
              </option>

            </select>

          </div>

          {/* Total Days */}

          <div>

            <span className="text-slate-600">
              Total selected leave:
            </span>

            <span className="font-bold ml-2">
              1.00 day(s)
            </span>

          </div>

          {/* Reason */}

          <div>

            <label className="block mb-2 font-medium">
              Reason
            </label>

            <textarea
              value={form.reason}
              onChange={(e) =>
                setForm({
                  ...form,
                  reason:
                    e.target.value,
                })
              }
              placeholder="Reason for leave"
              className="
                w-full
                border
                rounded-xl
                p-4
                h-40
              "
            />

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              text-white
              py-4
              rounded-xl
              font-semibold
            "
          >
            Submit leave request
          </button>

        </form>

      </div>

    </div>
  );
}