"use client"
import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];


function GlassmorphismChart() {
  return (
      <div className="relative z-10 w-256 mx-auto">
        {/* Main Chart Container - Takes 2/3 width and increased height */}
        <div className="w-full max-w-5xl mx-auto">
          <div className=" backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15">
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl pointer-events-none"></div>
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
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      {/* Gradient definitions for bars */}
                      <linearGradient id="desktopGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.8} />
                      </linearGradient>
                      <linearGradient id="mobileGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34D399" stopOpacity={1} />
                        <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                    
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="rgba(255,255,255,0.1)" 
                      vertical={false} 
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={15}
                      axisLine={false}
                      tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <Bar 
                      dataKey="desktop" 
                      fill="url(#desktopGradient)" 
                      radius={[6, 6, 0, 0]}
                      name="Desktop"
                    />
                    <Bar 
                      dataKey="mobile" 
                      fill="url(#mobileGradient)" 
                      radius={[6, 6, 0, 0]}
                      name="Mobile"
                    />
                      <Bar 
                      dataKey="mobile" 
                      fill="url(#mobileGradient)" 
                      radius={[6, 6, 0, 0]}
                      name="Mobile"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2 text-white/90 font-medium mb-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span>Энэ сард 5.2% өсөлт</span>
                </div>
                <p className="text-white/60 text-sm">
                  Сүүлийн 6 сарын нийт зочдын тоо
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