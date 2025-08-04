"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

        <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#0b2e49] to-[#155e75]">
          {/* Layered background with multiple gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/60 to-teal-800/40"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 via-transparent to-cyan-900/20"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-800/10 to-teal-700/20"></div>
          
          {/* Subtle animated background elements */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-300/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          <div className="flex w-full relative z-10">
            <Header />
            <main className="flex-1 p-6 relative">
              {/* Content backdrop with enhanced glass effect */}
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm  border border-white/5"></div>
              <div className="relative z-10">
                {children}
              </div>
            </main>
          </div>
        </div>

  );
}