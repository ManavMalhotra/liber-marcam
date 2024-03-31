"use client";
import useUserStore from "@/userStore";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { user, setUser } = useUserStore();
  const router = useRouter();
  
  const handleLogin = async () => {
    
    const data = JSON.stringify({
      email,
      password,
    });
    console.log(data);
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
        redirect("/");
      })
      .catch((error) => {
        console.error("Error sending magic link:", error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
