"use client"
import React from "react";
import { Github } from "lucide-react";
import Img from "@/public/pexels-adrien-olichon-1257089-2387793.jpg";
import { useRouter } from "next/navigation";


function Page() {
    const router = useRouter();
  const handleOnclick = () => {
    router.push("/dashboard");
  };  

  return (
    <div className="flex h-screen">
         <div className="w-1/2 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img src={Img.src} alt="Login visual" className="h-screen" />
        </div>
      </div>
      <div className="w-1/2 bg-black text-white p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full px-4">
          <h1 className="text-3xl font-bold mb-2 text-center">
            Login to your account
          </h1>
          <p className="text-gray-400 mb-8 text-center">
            Enter your email below to login to your account
          </p>

          <div className="mb-4">
            <label className="block text-sm mb-2 font-bold">Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              className="w-full p-3 rounded-lg bg-transparent border border-[#27272a] focus:border-white focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-bold">Password</label>
              <a href="#" className="text-sm text-white">
                Forgot your password?
              </a>
            </div>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-transparent border border-[#27272a] focus:border-white focus:outline-none"
            />
          </div>

          <button
          onClick={handleOnclick} className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold mb-6  ">
            Login
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-[#27272a] flex-grow"></div>
            <span className="text-gray-400 text-sm">Or continue with</span>
            <div className="h-px bg-[#27272a] flex-grow"></div>
          </div>

          <button className="w-full border border-[#27272a] py-3 rounded-lg font-medium flex items-center justify-center gap-2  transition-colors">
            <Github size={20} />
            <span>Login with GitHub</span>
          </button>

          <div className="mt-8 text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <a href="#" className="text-orange-600 underline hover:text-gray-300">
              Sign up
            </a>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Page;
