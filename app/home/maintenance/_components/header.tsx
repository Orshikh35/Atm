"use client";
import React, { useState } from "react";
import { Folder } from "lucide-react";
import Atm from "./atm";
import Kiosk from "./kiosk";
function Header() {
  const navItems = [
    {
      label: "ATM",
      key: "atm",
      component: <Atm />,
      icon: <Folder size={18} />,
    },
    {
      label: "Kiosk",
      key: "kiosk",
      component: "",
      icon: <Folder size={18} />,
    },
    {
      label: "idk",
      key: "idk",
      component:"",
      icon: <Folder size={18} />,
    }
  ];

  const [activeTab, setActiveTab] = useState("atm");

  const currentTab = navItems.find((item) => item.key === activeTab);

  return (
    <div>
      <nav className="flex gap-1">
        {navItems.map((item) => {
          const isActive = item.key === activeTab;
          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-2 px-4 py-2 transition ${
                isActive ? "text-white font-light" : "text-gray-100/50"
              }`}
            >
              /{item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div>{currentTab?.component}</div>
    </div>
  );
}

export default Header;
