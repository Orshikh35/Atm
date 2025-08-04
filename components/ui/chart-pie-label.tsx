"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#60A5FA" },
  { browser: "safari", visitors: 200, fill: "#34D399" },
  { browser: "firefox", visitors: 187, fill: "#F59E0B" },
  { browser: "edge", visitors: 173, fill: "#EF4444" },
  { browser: "other", visitors: 90, fill: "#8B5CF6" },
];

// Custom label function
const renderLabel = (entry: any) => {
  const percent = ((entry.visitors / chartData.reduce((sum, item) => sum + item.visitors, 0)) * 100).toFixed(1);
  return `${percent}%`;
};

function GlassmorphismPieChart() {
  const total = chartData.reduce((sum, item) => sum + item.visitors, 0);

  return (
        <div className=" backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-white/15">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                Хөтөчийн хуваарилалт
              </h2>
              <p className="text-blue-200/80 text-sm">
                2024 оны 1-6 дугаар сарын өгөгдөл
              </p>
            </div>

            {/* Chart with increased height */}
            <div className="h-96 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <radialGradient id="chromeGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#93C5FD" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </radialGradient>
                    <radialGradient id="safariGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#6EE7B7" />
                      <stop offset="100%" stopColor="#34D399" />
                    </radialGradient>
                    <radialGradient id="firefoxGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FCD34D" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </radialGradient>
                    <radialGradient id="edgeGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FCA5A5" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </radialGradient>
                    <radialGradient id="otherGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#C4B5FD" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </radialGradient>
                  </defs>
                  
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderLabel}
                    outerRadius={120}
                    innerRadius={60}
                 
                    dataKey="visitors"
                  >
                    {chartData.map((entry, index) => {
                      const gradients = [
                        "url(#chromeGradient)",
                        "url(#safariGradient)", 
                        "url(#firefoxGradient)",
                        "url(#edgeGradient)",
                        "url(#otherGradient)"
                      ];
                      return (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={gradients[index]}
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth={2}
                          style={{color: "white"}}
                        />
                      );
                    })}
                  </Pie>
              
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Footer with glass effect */}
            <div className="pt-4 border-t border-white/20">
              <div className="flex items-center justify-center gap-2 text-white/90 font-medium mb-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span>Энэ сард 5.2% өсөлт</span>
              </div>
              <p className="text-white/60 text-sm text-center">
                Сүүлийн 6 сарын нийт {total.toLocaleString()} зочдын хөтөчийн мэдээлэл
              </p>
            </div>
          </div>

          {/* Additional glass shine effect */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl pointer-events-none"></div>
        </div>
  );
}

export default GlassmorphismPieChart;