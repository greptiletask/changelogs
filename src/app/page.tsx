"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LineChart,
  Lock,
  Wallet,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2 font-bold" href="/">
            <FileText className="h-6 w-6 text-[#4ca475]" />
            <span>AutoCL</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button
              className="bg-transparent hover:bg-transparent text-[#4ca475] border border-[#4ca475] cursor-pointer"
              onClick={() => {
                window.open("https://app.autocl.live", "_blank");
              }}
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Curved Lines */}
          <svg
            className="absolute h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#4ca475" stopOpacity="0" />
                <stop offset="50%" stopColor="#4ca475" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4ca475" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#4ca475" stopOpacity="0" />
                <stop offset="50%" stopColor="#4ca475" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#4ca475" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Top Curves */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
              }}
              d="M 100 100 Q 300 0 500 100 T 900 100"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 0.5,
              }}
              d="M 0 200 Q 200 100 400 200 T 800 200"
              fill="none"
              stroke="url(#grad2)"
              strokeWidth="1"
            />

            {/* Bottom Curves */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 1,
              }}
              d="M 100 600 Q 300 500 500 600 T 900 600"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
          </svg>

          {/* Straight Lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "100%", opacity: 0 }}
                animate={{
                  x: "-100%",
                  opacity: [0, 0.7, 0.7, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                }}
                className="absolute right-0"
                style={{
                  top: `${15 + i * 10}%`,
                  height: "1px",
                  width: "100%",
                  background: `linear-gradient(90deg, transparent, #4ca47560, transparent)`,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 z-[1]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#4ca475]/30 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-[#4ca475]/30 blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-[3] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-3xl space-y-8"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              AutoCL
            </h1>
            <p className="text-lg text-[#4ca475] sm:text-xl">
              One click changelogs for your projects.
            </p>

            <div className="flex justify-center space-x-4">
              <Button
                className="bg-gradient-to-r from-[#4ca475] to-[#4ca475] text-lg text-black hover:opacity-90 cursor-pointer"
                onClick={() => {
                  window.open("https://app.autocl.live", "_blank");
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 border-t border-white/10 bg-black py-24"
      >
        <div className="px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why AutoCL?
            </h2>
            <p className="mt-4 text-gray-400">
              Enjoy effortlessly generated changelogs tailored to your workflow
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-[#4ca475]/50"
            >
              <CreditCard className="mb-4 h-12 w-12 text-[#4ca475]" />
              <h3 className="mb-2 text-xl font-bold">Effortless Summaries</h3>
              <p className="text-gray-400">
                Let AI summarize your commit messages into readable updates with
                minimal effort on your part.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-[#4ca475]/50"
            >
              <LineChart className="mb-4 h-12 w-12 text-[#4ca475]" />
              <h3 className="mb-2 text-xl font-bold">Developer Insights</h3>
              <p className="text-gray-400">
                Turn raw commit data into high-level, developer-friendly
                insights about what changed and why it matters.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-[#4ca475]/50"
            >
              <Lock className="mb-4 h-12 w-12 text-[#4ca475]" />
              <h3 className="mb-2 text-xl font-bold">Secure & Private</h3>
              <p className="text-gray-400">
                We respect your codebase, ensuring encrypted data processing and
                no third-party exposure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 border-t border-white/10 bg-black py-24">
        <div className="px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#4ca475]/5 p-8 text-center backdrop-blur-sm md:p-12 lg:p-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Automate Your Changelogs?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Join teams that rely on us for lightning-fast release notes and
              developer-friendly updates.
            </p>
            <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-4 text-left">
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#4ca475]" />
                <span>AI-Powered Summaries</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#4ca475]" />
                <span>GitHubIntegration</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-[#4ca475]" />
                <span>Instant Publishing to Stakeholders</span>
              </li>
            </ul>
            <Button
              className="mt-8 bg-gradient-to-r from-[#4ca475] to-[#4ca475] text-lg text-black hover:opacity-90 cursor-pointer"
              onClick={() => {
                window.open("https://app.autocl.live", "_blank");
              }}
            >
              Start Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8">
        <div className="flex flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-[#4ca475]" />
            <span className="font-bold">AutoCL</span>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} AutoCL. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
