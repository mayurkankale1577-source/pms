"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [locationStatus, setLocationStatus] =
    useState(
      "Checking browser location permission..."
    );

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus(
        "Geolocation is not supported by your browser"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationStatus(
          "Location Access Granted"
        );
      },
      () => {
        setLocationStatus(
          "Location Permission Denied"
        );
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        alert(
          "Login Successful"
        );

        window.location.href =
          "/dashboard";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
  <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-200 p-10">

    <div className="mb-8">
      <p className="text-xs font-semibold tracking-[6px] uppercase text-blue-600 mb-4">
        Billing System
      </p>

      <h1 className="text-6xl font-bold text-slate-900 mb-4">
        Welcome
      </h1>

      <p className="text-slate-500 text-lg">
        Sign in with your email and password.
      </p>
    </div>

    <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-700">
      {locationStatus}
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            focus:border-blue-600
            focus:outline-none
          "
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            focus:border-blue-600
            focus:outline-none
          "
        />
      </div>

      <button
        type="submit"
        className="
          w-full
          rounded-xl
          bg-blue-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-blue-700
        "
      >
        Sign In
      </button>

    </form>
  </div>
</div>
  );
}