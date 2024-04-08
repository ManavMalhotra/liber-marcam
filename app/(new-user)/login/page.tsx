"use client";
import useUserStore from "@/userStore";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useUserStore();
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Logging in...");
    console.table({ email, password });
    const data = JSON.stringify({
      email,
      password,
    });
    fetch("https://liber-marcam-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        localStorage.setItem("user", JSON.stringify(data));

        // update the user store
        setUser(data);
        // redirect("/");
      })
      .catch((error) => {
        console.error("Error sending magic link:", error);
      });
  };

  return (
    <div className="w-full h-100">
      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
        Log in to your account
      </h1>

      <div className="mt-6">
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-gray-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="true"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            minLength={6}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-gray-500
              focus:bg-white focus:outline-none"
            required
          />
        </div>

        <div className="text-right mt-2">
          <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-gray-700 focus:text-gray-700"
          >
            Forgot Password?
          </a>
        </div>

        <button
          className="w-full block bg-slate-950 hover:bg-gray-900 focus:bg-gray-900 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>

      <hr className="my-6 border-gray-300 w-full" />

      <p className="mt-8">
        Need an account?{" "}
        <Link
          href="/signup"
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Page;
