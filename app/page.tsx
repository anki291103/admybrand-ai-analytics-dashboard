"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0B0F] text-white">

      {/* 🌌 Animated Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-30%] left-[-20%] w-[700px] h-[700px] bg-purple-600/40 rounded-full blur-[140px] animate-blob" />
        <div className="absolute top-[10%] right-[-20%] w-[600px] h-[600px] bg-indigo-600/40 rounded-full blur-[140px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-30%] left-[20%] w-[600px] h-[600px] bg-pink-600/30 rounded-full blur-[140px] animate-blob animation-delay-4000" />
      </div>

      {/* 🧭 NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6">
        <h1 className="text-xl font-bold tracking-wide">
          ADmyBRAND<span className="text-indigo-400">.</span>
        </h1>

        <div className="flex gap-4">
          <Link href="/signup">
  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition font-semibold shadow-lg">
    Sign Up
  </button>
</Link>

          <Link href="/login">
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition font-semibold shadow-lg">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* 🚀 HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 mt-28">

        {/* Glass Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl w-full rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 p-12 shadow-[0_0_80px_rgba(99,102,241,0.25)]"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            AI-Powered <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Analytics Platform
            </span>
          </h2>

          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            Real-time insights, predictive intelligence, and secure role-based
            dashboards — built with modern full-stack architecture.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <Link href="/login">
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition font-semibold shadow-xl">
                Login to Dashboard
              </button>
            </Link>
            <Link href="#features">
              <button className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition">
                Explore Features
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ✨ FEATURES */}
      <section
        id="features"
        className="mt-40 px-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-10"
      >
        {[
          {
            title: "AI-Driven Insights",
            desc: "Anomaly detection, forecasting, and NLP-powered analytics for smarter decisions.",
          },
          {
            title: "Role-Based Access",
            desc: "Secure admin and viewer dashboards with fine-grained permissions.",
          },
          {
            title: "Live Data Engine",
            desc: "Real-time updates with performance-optimized rendering.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 hover:scale-[1.03] transition shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
            <p className="text-gray-300 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* 🧾 FOOTER */}
      <footer className="mt-40 py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} ADmyBRAND Insights • Built for Full Stack Engineer Intern Evaluation
      </footer>
    </div>
  );
}
