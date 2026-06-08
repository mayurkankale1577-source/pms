"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(
      "/api/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Password Updated");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      alert(data.message);
    }
  };

  const inputClass =
    "w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:border-blue-600";

  return (
    <div className="max-w-5xl mx-auto">
       
      <h1 className="text-4xl font-bold mb-2">
        Change Password
      </h1>

      <p className="text-slate-500 mb-6">
        Update your account password.
      </p>

      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-2">
          Change Password
        </h2>

        <p className="text-slate-500 mb-6">
          Enter your current password and choose a new password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-semibold">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={
                formData.currentPassword
              }
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-lg
              font-semibold
              transition
            "
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}