import React from "react";
import StatusCards from "./_components/status";
import Chart from "@/components/ui/chart-bar-multiple"
import  ChartPieLabel  from "@/components/ui/chart-pie-label";

function Page() {
  return (
    <div className="text-white flex flex-col  ">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-blue-700/10 to-teal-500/20 pointer-events-none"></div>

      <h1 className="text-2xl font-medium text-white/80 mb-6  drop-shadow-lg">
        Нүүр хуудас
      </h1>
      <div className="flex flex-col gap-6">
        <StatusCards />
        <div className="flex gap-6">
          <Chart />
          <div className="w-1/3">
            <ChartPieLabel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
