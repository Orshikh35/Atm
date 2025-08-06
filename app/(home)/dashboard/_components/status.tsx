"use client";
import React, { useEffect, useState } from "react";
import { CreditCard, Touchpad, Puzzle } from "lucide-react";
import { getStatus } from "@/action/dashboard";

const cardItems = [
  {
    key: "countATMs",
    title: "ATM төхөөрөмж",
    icon: <CreditCard className="text-white/90 w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />,
  },
  {
    key: "countKiosks",
    title: "Киоск машин",
    icon: <Touchpad className="text-white/90 w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />,
  },
  {
    key: "countOthers",
    title: "Бусад төхөөрөмж",
    icon: <Puzzle className="text-white/90 w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />,
  },
  {
    key: "countOthers",
    title: "Бусад төхөөрөмж",
    icon: <Puzzle className="text-white/90 w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />,
  },
];

export default function StatusCards() {
  const [data, setData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStatus();

      if (res.success) {
        console.log("Status data:", res.result);
        setData(res.result);
      } else {
        console.error("Failed to fetch status data:", res.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[136px] w-full justify-between gap-4 flex">
      {cardItems.map((item, index) => (
        <div
          key={index}
          className="relative backdrop-blur-md rounded-2xl flex flex-col justify-between items-start px-6 py-6 w-full border border-white/20 shadow-2xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
          style={{ minWidth: 0 }}
        >
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-400/10 via-transparent to-purple-400/10 rounded-2xl pointer-events-none opacity-60"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </div>

          {/* Title */}
          <div className="flex items-center justify-between w-full relative z-10 mb-2">
            <h3 className="text-white/70 text-sm font-medium drop-shadow-sm">{item.title}</h3>
          </div>

          {/* Value and icon */}
          <div className="flex items-end justify-between w-full relative z-10">
            <div className="flex flex-col">
              <p className="text-white text-3xl font-bold drop-shadow-lg mb-1">
                {data[item.key] ?? 0}
              </p>
              <p className="text-white/40 text-xs">Нийт бүртгэлтэй</p>
            </div>
            <button className="p-3 rounded-xl bg-gradient-to-br from-blue-400/30 to-purple-400/30 backdrop-blur-sm border border-white/20 hover:from-blue-400/40 hover:to-purple-400/40 transition-all duration-300 shadow-lg hover:shadow-xl group/btn">
              {item.icon}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
