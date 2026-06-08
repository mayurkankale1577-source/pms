"use client";

import { useState } from "react";

export default function AddUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",

    user_type: "",
    functional_role: "",
    employee_code: "",
    designation: "",
    joining_date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert("User Created");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",

        user_type: "",
        functional_role: "",
        employee_code: "",
        designation: "",
        joining_date: "",
      });
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">
        Add User
      </h1>

      <p className="text-slate-500 mb-6">
        Create a new employee account
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-8"
      >
        <div className="grid grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3"
            >
              <option value="user">
                User
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              User Type
            </label>

            <input
              type="text"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Functional Role
            </label>

            <input
              type="text"
              name="functional_role"
              value={formData.functional_role}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Employee Code
            </label>

            <input
              type="text"
              name="employee_code"
              value={formData.employee_code}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Designation
            </label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Joining Date
            </label>

            <input
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg p-3"
            />
          </div>

        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Create User
        </button>
      </form>
    </div>
  );
}