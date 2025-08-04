import React from "react";
import { Atom, TrendingUp, TrendingDown } from "lucide-react";

const data = [
  { 
    title: "Customers", 
    value: "12.3k", 
    previousValue: "11.8k",
    trend: "up",
    change: "+4.2%"
  },
  { 
    title: "Website Views", 
    value: "21.6k", 
    previousValue: "23.1k",
    trend: "down",
    change: "-6.5%"
  },
  { 
    title: "Orders", 
    value: "34.4k", 
    previousValue: "31.2k",
    trend: "up",
    change: "+10.3%"
  },
  { 
    title: "Growth", 
    value: "15.6%", 
    previousValue: "13.2%",
    trend: "up",
    change: "+2.4%"
  },
];

export default function StatusCards() {
  return (
    <div className="h-[136px] w-full justify-between gap-4 flex">
      {data.map((item, index) => (
        <div
          key={index}
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
              {item.title}
            </h3>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
              item.trend === 'up' 
                ? 'bg-emerald-400/20 border-emerald-400/30 text-emerald-300' 
                : 'bg-red-400/20 border-red-400/30 text-red-300'
            }`}>
              {item.trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change}
            </div>
          </div>

          {/* Main value and icon */}
          <div className="flex items-end justify-between w-full relative z-10">
            <div className="flex flex-col">
              <p className="text-white text-3xl font-bold drop-shadow-lg mb-1">
                {item.value}
              </p>
              <p className="text-white/40 text-xs">
                from {item.previousValue}
              </p>
            </div>
            
            <button className="p-3 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-400/30 backdrop-blur-sm border border-white/20 hover:from-blue-400/40 hover:to-purple-400/40 transition-all duration-300 shadow-lg hover:shadow-xl group/btn">
              <Atom className="text-white/90 drop-shadow-sm w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
            </button>
          </div>


        </div>
      ))}
    </div>
  );
}