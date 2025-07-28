"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function AiTravelLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const handleOnclick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0d13] relative overflow-hidden">
      {/* Background gradient circles */}
      <div
        className="absolute bottom-[-300px] left-[-300px] w-[900px] h-[900px] blur-[200px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(249, 115, 22, 0.8) 0%, transparent 90%)",
        }}
      />

      <div
        className="absolute top-[-300px] right-[-300px] w-[900px] h-[900px] blur-[200px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168, 85, 247, 0.8) 0%, transparent 90%)",
        }}
      />

      {/* Main login container */}
      <div className="relative bg-gray-300/10 backdrop-blur-xl rounded-3xl p-14 w-full max-w-xl mx-4 border border-white/10 shadow-2xl">
        {/* Welcome text */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-white mb-4">Нэвтрэх</h2>
          <p className="text-gray-300 text-sm">
            Welcome back John William, please log in
          </p>
        </div>

        {/* Email input */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-2">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none"
              placeholder="morgan@gmail.com"
            />
          </div>
        </div>

        {/* Password input */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-2">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none"
              placeholder="••••••••••••••"
            />
          </div>
        </div>

        {/* Remember me and Forgot password */}
        <div className="flex items-center justify-between mb-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 border border-white/30 rounded transition-all cursor-pointer ${
                rememberMe
                  ? "bg-yellow-400 border-yellow-400"
                  : "bg-transparent"
              }`}
              onClick={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && (
                <svg
                  className="w-4 h-4 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span className="ml-2 text-sm text-gray-300">Remember</span>
          </label>
          <button className="text-sm text-gray-300 hover:text-white transition-colors">
            Forgot Password?
          </button>
        </div>

        {/* Continue button */}
        <button
          onClick={handleOnclick}
          className="w-full bg-yellow-400 text-black font-semibold py-3 px-4 rounded-xl shadow-lg"
        >
          Continue
        </button>

        {/* Sign up link */}
        <div className="text-center mt-8">
          <span className="text-gray-400 text-sm">Don't have an account? </span>
          <button className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors font-medium">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiTravelLogin;
