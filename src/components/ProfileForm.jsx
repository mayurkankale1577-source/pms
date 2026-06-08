"use client";

import { useState } from "react";

export default function ProfileForm({
  user = {},
}) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    secondary_phone: user.secondary_phone || "",

    employee_code: user.employee_code || "",
    designation: user.designation || "",
    user_type: user.user_type || "",
    functional_role: user.functional_role || "",

    joining_date: user.joining_date
      ? String(user.joining_date).substring(0, 10)
      : "",

    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    country: user.country || "",
    pincode: user.pincode || "",
  });

  const inputClass =
    "w-full h-12 px-4 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  const readOnlyClass =
    "w-full h-12 px-4 border border-slate-300 rounded-xl bg-slate-100";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert("Profile Updated");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your account information
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-6
          md:p-10
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={formData.name}
              readOnly
              className={readOnlyClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className={readOnlyClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              User Type
            </label>

            <input
              type="text"
              value={formData.user_type}
              readOnly
              className={readOnlyClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Functional Role
            </label>

            <input
              type="text"
              value={formData.functional_role}
              readOnly
              className={readOnlyClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Employee Code
            </label>

            <input
              type="text"
              value={formData.employee_code}
              readOnly
              className={readOnlyClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Designation
            </label>

            <input
              type="text"
              value={formData.designation}
              readOnly
              className={readOnlyClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Joining Date
            </label>

            <input
              type="date"
              value={formData.joining_date}
              readOnly
              className={readOnlyClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <input
              type="text"
              value={user?.role || ""}
              readOnly
              className={readOnlyClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Primary Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Secondary Phone
            </label>

            <input
              type="text"
              name="secondary_phone"
              value={formData.secondary_phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={5}
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="
              px-8
              py-3
              bg-blue-600
              hover:bg-blue-700
              text-white
              rounded-xl
              font-semibold
              transition
            "
          >
            Update Profile
          </button>
        </div>
      </form>

    </div>
  );
}