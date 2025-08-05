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
  "#93C5FD", // Pending
  "#6EE7B7", // Completed
  "#FCD34D", // InProgress
  "#FCA5A5", // Cancelled
  "#C4B5FD", // Testing
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
            Хөтөчийн хуваарилалт
          </h2>
          <p className="text-blue-200/80 text-sm">2024 оны 1-6 дугаар сарын өгөгдөл</p>
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

        <div className="pt-4 border-t border-white/20">
          <div className="flex items-center justify-center gap-2 text-white/90 font-medium mb-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span>Энэ сард 5.2% өсөлт</span>
          </div>
          <p className="text-white/60 text-sm text-center">
            Сүүлийн 6 сарын нийт {total.toLocaleString()} хүсэлт хүлээн авсан
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl pointer-events-none"></div>
    </div>
  );
}

export default GlassmorphismPieChart;
