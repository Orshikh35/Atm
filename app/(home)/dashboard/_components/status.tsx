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
    <div className=" rounded-xl  h-[336px] w-1/3  justify-between gap-4 grid grid-cols-2">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-[#181719] rounded-lg flex flex-col justify-between items-start px-6 py-8"
          style={{ minWidth: 0 }}
        >
          <h3 className="text-gray-100/40 text-md font-light">{item.title}</h3>
          <div className="flex items-center justify-between w-full">
            <p className="text-white text-4xl font-bold">{item.value}</p>
            <button className="p-2 rounded-lg bg-orange-100/20"><Atom/></button>
          </div>
        </div>
      ))}
    </div>
  );
}
