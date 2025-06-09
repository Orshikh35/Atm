"use client";

import { useState, useEffect } from "react";

interface Kiosk {
  id: number;
  name: string;
  status: "online" | "offline";
  requests: number;
}

export function KioskDashboard() {
  const [kiosks, setKiosks] = useState<Kiosk[]>(() =>
    Array.from({ length: 8 }).map((_, idx) => ({
      id: idx + 1,
      name: `Kiosk ${idx + 1}`,
      status: Math.random() > 0.2 ? "online" : "offline",
      requests: Math.floor(Math.random() * 5),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setKiosks((prev) =>
        prev.map((k) => ({
          ...k,
          status: Math.random() > 0.2 ? "online" : "offline",
          requests: k.requests + (Math.random() > 0.5 ? 1 : 0),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const statusColor = (s: "online" | "offline") =>
    s === "online"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : "bg-red-100 text-red-800 border-red-200";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {kiosks.map((k) => (
        <div
          key={k.id}
          className="p-4 bg-white rounded-xl shadow border border-gray-200 space-y-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{k.name}</h3>
            <span
              className={`px-2 py-1 rounded text-xs font-medium border ${statusColor(
                k.status
              )}`}
            >
              {k.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">Requests: {k.requests}</p>
        </div>
      ))}
    </div>
  );
}
