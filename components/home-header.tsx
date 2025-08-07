"use client";
import { getEnvValue } from "@/lib/api/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function NavHeader() {
  const router = useRouter();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      const url = await getEnvValue("AUTH_URL");
      if (url) {
        router.push(`${url}?appName=crm`);
      } else {
        console.error("AUTH_URL not found");
      }
    };
  
    fetchAndRedirect();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0b2e49] to-[#155e75] relative overflow-hidden">
      {/* Layered background with multiple gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/60 to-teal-800/40"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 via-transparent to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-800/10 to-teal-700/20"></div>

      {/* Subtle animated background elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-300/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      {/* Main login container */}
      <div className="relative bg-white/10 backdrop-filter backdrop:backdrop-blur-md border border-white/20  rounded-2xl p-8 w-full max-w-md shadow-lg ">
        {/* Welcome text */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-white mb-4">Нэвтрэх</h2>
          <p className="text-gray-300 text-sm">
            Welcome back John William, please log in
          </p>
        </div>

        {/* Continue button */}
        <button
          // onClick={async () => {
          //   const url = await getEnvValue("AUTH_URL");
          //   router.push(`${url}?appName=crm`);
          //   console.log("Redirecting to:", url);
          // }}
          className="w-full bg-blue-500  font-semibold py-3 px-4 rounded-xl shadow-lg text-white"
        >
          Нэвтрэх
        </button>
      </div>
    </div>
  );
}

export default NavHeader;
