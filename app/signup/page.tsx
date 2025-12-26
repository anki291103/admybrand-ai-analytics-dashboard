"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem("viewer_users") || "[]"
    );

    const alreadyExists = existingUsers.find(
      (u: any) => u.email === email
    );

    if (alreadyExists) {
      alert("User already exists. Please login.");
      router.push("/login");
      return;
    }

    existingUsers.push({
      name,
      email,
      password,
      role: "viewer",
    });

    localStorage.setItem(
      "viewer_users",
      JSON.stringify(existingUsers)
    );

    alert("Signup successful! Please login.");
    router.push("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0B0B0F] text-white overflow-hidden">

      {/* 🌌 Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-30%] left-[-20%] w-[600px] h-[600px] bg-indigo-600/40 blur-[140px] rounded-full animate-blob" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[600px] h-[600px] bg-purple-600/40 blur-[140px] rounded-full animate-blob animation-delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-10 shadow-[0_0_80px_rgba(99,102,241,0.35)]"
      >
        <h1 className="text-3xl font-extrabold text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-300 text-sm mb-8">
          Viewer access to analytics dashboard
        </p>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-xs uppercase text-gray-400 mb-2">
            Full Name
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-xs uppercase text-gray-400 mb-2">
            Email
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs uppercase text-gray-400 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold shadow-xl hover:scale-[1.02] transition disabled:opacity-60"
        >
          Sign Up
        </button>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
