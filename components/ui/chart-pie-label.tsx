"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { getPieChart } from "@/action/dashboard";

type PieData = {
  status: string;
  totalRequests: number;
};

const gradients = [
  "#3B82F6", // Pending – Blue
  "#10B981", // Completed – Green
  "#F59E0B", // InProgress – Amber
  "#EF4444", // Cancelled – Red
  "#8B5CF6", // Testing – Violet
];

function GlassmorphismPieChart() {
  const [data, setData] = useState<PieData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPieChart();
      if (res) setData(res);
      else console.error("Failed to fetch chart data");
    };
    fetchData();
  }, []);

  const total = data.reduce((sum, item) => sum + item.totalRequests, 0);

  const renderLabel = (entry: PieData) => {
    const percent = ((entry.totalRequests / total) * 100).toFixed(1);
    return `${percent}%`;
  };

  return (
    <div className="relative backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
      <div className="relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            Хүсэлтийн хуваарилалт
          </h2>
          <p className="text-white/60 text-sm text-center">
            Сүүлийн 6 сарын нийт {total.toLocaleString()} хүсэлт хүлээн авсан
          </p>
        </div>

        <div className="h-96 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="totalRequests"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                labelLine={false}
                label={renderLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={gradients[index % gradients.length]}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Footer stats */}
        <div className="pt-6 border-t border-white/20 flex flex-col items-center gap-3">
          <div className="flex items-center justify-between  text-white/90 font-medium mt-4">
            <div className="grid grid-cols-3  w-full text-sm text-white/80">
              {data.slice(0, 3).map((entry, index) => (
                <div key={entry.status} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: gradients[index % gradients.length],
                    }}
                  ></span>
                  <span className="text-white/60 text-[12px]">
                    {entry.status} — {entry.totalRequests.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Second row with 2 items centered */}
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-2 gap-6">
              {data.slice(3).map((entry, index) => (
                <div key={entry.status} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        gradients[(index + 3) % gradients.length],
                    }}
                  ></span>
                  <span className="text-white/60 text-[12px]">
                    {entry.status} — {entry.totalRequests.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Glass shine */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl pointer-events-none"></div>
    </div>
  );
}

export default GlassmorphismPieChart;
