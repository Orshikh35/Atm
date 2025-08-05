"use client";
import React, { use, useEffect, useState } from "react";
import { Atom, TrendingUp, TrendingDown, MonitorSmartphone } from "lucide-react";
import { getStatus } from "@/action/dashboard";

export default function StatusCards() {

  interface StatusData {
    countATMs: number;
    trend: 'up' | 'down';
    change: string;
    value: number;
    previousValue: number;
    countKiosks: number;
    countOthers: number;
  }

  const [data, setData] = useState<StatusData | null>(null);


  useEffect(() => {
    const fetchData = async () => {
     const res = await getStatus();
      if (res.status) {
        setData(res.data);
      } else {
        console.error("Failed to fetch status data:", res.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[136px] w-full justify-between gap-4 flex">
 
        <div
          className="relative  backdrop-blur-md rounded-2xl flex flex-col justify-between items-start px-6 py-6 w-full border border-white/20 shadow-2xl overflow-hidden group  transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
          style={{ minWidth: 0 }}
        >
          {/* Enhanced liquid glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-400/10 via-transparent to-purple-400/10 rounded-2xl pointer-events-none opacity-60"></div>
          
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </div>

          {/* Status indicator and title */}
          <div className="flex items-center justify-between w-full relative z-10 mb-2">
            <h3 className="text-white/70 text-sm font-medium drop-shadow-sm">
              {data?.countATMs}
            </h3>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
              data?.trend === 'up' 
                ? 'bg-emerald-600/20 border-emerald-600/30 text-emerald-300' 
                : 'bg-red-600/20 border-red-400/20 text-red-300'
            }`}>
              {data?.trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {data?.change}
            </div>
          </div>

 
          <div className="flex items-end justify-between w-full relative z-10">
            <div className="flex flex-col">
              <p className="text-white text-3xl font-bold drop-shadow-lg mb-1">
                {data?.value}
              </p>
              <p className="text-white/40 text-xs">
                from {data?.previousValue}
              </p>
            </div>
            
            <button className="p-3 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-400/30 backdrop-blur-sm border border-white/20 hover:from-blue-400/40 hover:to-purple-400/40 transition-all duration-300 shadow-lg hover:shadow-xl group/btn">
              <MonitorSmartphone className="text-white/90 drop-shadow-sm w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
            </button>
          </div>


        </div>
        <div
          className="relative  backdrop-blur-md rounded-2xl flex flex-col justify-between items-start px-6 py-6 w-full border border-white/20 shadow-2xl overflow-hidden group  transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
          style={{ minWidth: 0 }}
        >
          {/* Enhanced liquid glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-400/10 via-transparent to-purple-400/10 rounded-2xl pointer-events-none opacity-60"></div>
          
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </div>

          {/* Status indicator and title */}
          <div className="flex items-center justify-between w-full relative z-10 mb-2">
            <h3 className="text-white/70 text-sm font-medium drop-shadow-sm">
              {data?.countATMs}
            </h3>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
              data?.trend === 'up' 
                ? 'bg-emerald-600/20 border-emerald-600/30 text-emerald-300' 
                : 'bg-red-600/20 border-red-400/20 text-red-300'
            }`}>
              {data?.trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {data?.change}
            </div>
          </div>

 
          <div className="flex items-end justify-between w-full relative z-10">
            <div className="flex flex-col">
              <p className="text-white text-3xl font-bold drop-shadow-lg mb-1">
                {data?.value}
              </p>
              <p className="text-white/40 text-xs">
                from {data?.previousValue}
              </p>
            </div>
            
            <button className="p-3 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-400/30 backdrop-blur-sm border border-white/20 hover:from-blue-400/40 hover:to-purple-400/40 transition-all duration-300 shadow-lg hover:shadow-xl group/btn">
              <MonitorSmartphone className="text-white/90 drop-shadow-sm w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
            </button>
          </div>


        </div>
        <div
          className="relative  backdrop-blur-md rounded-2xl flex flex-col justify-between items-start px-6 py-6 w-full border border-white/20 shadow-2xl overflow-hidden group  transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
          style={{ minWidth: 0 }}
        >
          {/* Enhanced liquid glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-400/10 via-transparent to-purple-400/10 rounded-2xl pointer-events-none opacity-60"></div>
          
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </div>

          {/* Status indicator and title */}
          <div className="flex items-center justify-between w-full relative z-10 mb-2">
            <h3 className="text-white/70 text-sm font-medium drop-shadow-sm">
              {data?.countKiosks}
            </h3>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
              data?.trend === 'up' 
                ? 'bg-emerald-600/20 border-emerald-600/30 text-emerald-300' 
                : 'bg-red-600/20 border-red-400/20 text-red-300'
            }`}>
              {data?.trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {data?.change}
            </div>
          </div>

 
          <div className="flex items-end justify-between w-full relative z-10">
            <div className="flex flex-col">
              <p className="text-white text-3xl font-bold drop-shadow-lg mb-1">
                {data?.value}
              </p>
              <p className="text-white/40 text-xs">
                from {data?.previousValue}
              </p>
            </div>
            
            <button className="p-3 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-400/30 backdrop-blur-sm border border-white/20 hover:from-blue-400/40 hover:to-purple-400/40 transition-all duration-300 shadow-lg hover:shadow-xl group/btn">
              <MonitorSmartphone className="text-white/90 drop-shadow-sm w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
            </button>
          </div>


        </div>
        <div
          className="relative  backdrop-blur-md rounded-2xl flex flex-col justify-between items-start px-6 py-6 w-full border border-white/20 shadow-2xl overflow-hidden group  transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
          style={{ minWidth: 0 }}
        >
          {/* Enhanced liquid glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-400/10 via-transparent to-purple-400/10 rounded-2xl pointer-events-none opacity-60"></div>
          
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </div>

          {/* Status indicator and title */}
          <div className="flex items-center justify-between w-full relative z-10 mb-2">
            <h3 className="text-white/70 text-sm font-medium drop-shadow-sm">
              {data?.countOthers}
            </h3>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
              data?.trend === 'up' 
                ? 'bg-emerald-600/20 border-emerald-600/30 text-emerald-300' 
                : 'bg-red-600/20 border-red-400/20 text-red-300'
            }`}>
              {data?.trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {data?.change}
            </div>
          </div>

 
          <div className="flex items-end justify-between w-full relative z-10">
            <div className="flex flex-col">
              <p className="text-white text-3xl font-bold drop-shadow-lg mb-1">
                {data?.value}
              </p>
              <p className="text-white/40 text-xs">
                from {data?.previousValue}
              </p>
            </div>
            
            <button className="p-3 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-400/30 backdrop-blur-sm border border-white/20 hover:from-blue-400/40 hover:to-purple-400/40 transition-all duration-300 shadow-lg hover:shadow-xl group/btn">
              <MonitorSmartphone className="text-white/90 drop-shadow-sm w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
            </button>
          </div>


        </div>
    </div>
  );
}