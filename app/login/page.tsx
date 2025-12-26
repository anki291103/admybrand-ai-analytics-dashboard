"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    const viewerUsers =
      typeof window !== "undefined"
        ? localStorage.getItem("viewer_users") || "[]"
        : "[]";

    const res = await signIn("credentials", {
      email,
      password,
      viewerUsers,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0F] text-white">

      {/* 🌌 Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-30%] left-[-20%] w-[600px] h-[600px] bg-indigo-600/40 rounded-full blur-[140px] animate-blob" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[600px] h-[600px] bg-purple-600/40 rounded-full blur-[140px] animate-blob animation-delay-2000" />
      </div>

      {/* 🔐 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-10 shadow-[0_0_80px_rgba(99,102,241,0.35)]"
      >
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-wide">
            ADmyBRAND<span className="text-indigo-400">.</span>
          </h1>
          <p className="text-gray-300 mt-2 text-sm">
            Sign in to your analytics dashboard
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
            Email
          </label>
          <input
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold shadow-xl hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Signup link */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            Sign up
          </Link>
        </div>

        {/* Back */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
