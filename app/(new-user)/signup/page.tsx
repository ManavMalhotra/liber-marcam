"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function SignIn() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
    } catch (error) {
      console.error("Error sending magic link:", error);
    }
  };

  return (
    <div className="w-full h-100">
      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
        Create your account
      </h1>

      <form className="mt-6" action="#" method="POST">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="name"
            name="first-name"
            id="first-name"
            placeholder="John"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="true"
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="name"
            name="last-name"
            id="last-name"
            placeholder="Doe"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-gray-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="true"
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
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
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </form>

      <hr className="my-6 border-gray-300 w-full" />

      <p className="mt-8">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

// <div>
//   <h1>Sigin</h1>
//   <input
//     type="text"
//     placeholder="First Name"
//     value={firstName}
//     onChange={(e) => setFirstName(e.target.value)}
//   />
//   <input
//     type="text"
//     placeholder="Last Name"
//     value={lastName}
//     onChange={(e) => setLastName(e.target.value)}
//   />
//   <input
//     type="email"
//     placeholder="Email"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//   />
//   <input
//     type="password"
//     placeholder="Password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />
//   <br />
//   <button onClick={handleSignIn}>Send Magic Link</button>
// </div>
