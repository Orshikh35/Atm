"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { getLineChart } from "@/action/dashboard";
import CustomTooltip from "./CustomTooltip";

function GlassmorphismChart() {
  const [data, setData] = useState([]);
  console.log({ data });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getLineChart();

      if (res) {
        setData(res);
      } else {
        console.error("Failed to fetch chart data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative z-10 w-256 mx-auto">
      {/* Main Chart Container - Takes 2/3 width and increased height */}
      <div className="w-full max-w-5xl mx-auto">
        <div className=" backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                Статистикийн мэдээлэл
              </h2>
              <p className="text-blue-200/80 text-sm">
                2024 оны 1-6 дугаар сарын өгөгдөл
              </p>
            </div>

            {/* Chart with increased height */}
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    {/* Gradient definitions for bars */}
                    <linearGradient
                      id="desktopGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#3B82F6"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                    <linearGradient
                      id="mobileGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#34D399" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#059669"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                    <linearGradient
                      id="orangeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ff991c" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#ff5c00"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                    <linearGradient
                      id="redGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#ff8080" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#d40000"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="display"
                    tickLine={false}
                    tickCount={6}
                    tickMargin={10}
                    axisLine={false}
                    tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 12 }}
                    tickFormatter={(value) => value.slice(0, 7)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="pendingCount"
                    fill="url(#desktopGradient)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="inProgressCount"
                    fill="url(#mobileGradient)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="completedCount"
                    fill="url(#orangeGradient)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="cancelledCount"
                    fill="url(#redGradient)"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="testingCount"
                    fill="url(#mobileGradient)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-4 mb-2">
                  <p className="w-2 h-2 rounded-full bg-red-500"></p>
                  <p className="text-gray-400 text-[12px]">Хүлээгдэж буй</p>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <p className="w-2 h-2 rounded-full bg-red-500"></p>
                  <p className="text-gray-400 text-[12px]">Хэрэгжиж буй</p>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <p className="w-2 h-2 rounded-full bg-red-500"></p>
                  <p className="text-gray-400 text-[12px]">Дууссан</p>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <p className="w-2 h-2 rounded-full bg-red-500"></p>
                  <p className="text-gray-400 text-[12px]">Цуцлагдсан</p>
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <p className="w-2 h-2 rounded-full bg-red-500"></p>
                  <p className="text-gray-400 text-[12px]">Тест хийгдэж буй</p>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                Сүүлийн 12 сарын статусын үзүүлэлт
              </p>
            </div>
          </div>

          {/* Additional glass shine effect */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}

export default GlassmorphismChart;
