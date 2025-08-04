import React from "react";
import { Atom } from "lucide-react";

const data = [
  { title: "Customers", value: "12.3k" },
  { title: "Website Views", value: "21.6k" },
  { title: "Orders", value: "34.4k" },
  { title: "Growth", value: "15.6%" },
];

export default function StatusCards() {
  return (
    <div className=" h-[136px] w-full justify-between gap-4 flex ">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-400/20  backdrop-blur-[1px] rounded-lg flex flex-col justify-between items-start px-6 py-8 w-full border border-neutral-400/20 shadow-xl transition-all duration-300 hover:shadow-2xl "
          style={{ minWidth: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none"></div>
          <h3 className="text-white/60 text-md font-light drop-shadow-sm relative z-10">
            {item.title}
          </h3>
          <div className="flex items-center justify-between w-full relative z-10">
            <p className="text-white text-4xl font-bold drop-shadow-lg">
              {item.value}
            </p>
            <button className="p-2 rounded-lg bg-blue-400/20 backdrop-blur-sm border border-blue-300/30 hover:bg-blue-400/30 transition-all duration-300 shadow-lg">
              <Atom className="text-blue-400 drop-shadow-sm" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
