"use client";
import React from "react";
import {
  ChevronRight,
  Home,
  Users,
  FileText,
  Wrench,
  Laptop
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Нүүр",
      href: "/dashboard",
      icon: <Home size={18} />,
    },
    {
      label: "Төхөөрөмж",
      href: "/device",
      icon: <Laptop size={18} />,
    },
    {
      label: "Засвар үйлчилгээ",
      href: "/maintenance",
      icon: <Wrench size={18} />,
    },
    {
      label: "Тайлан",
      href: "/reports",
      icon: <FileText size={18} />,
    },
    {
      label: "Ажилчид",
      href: "/employees",
      icon: <Users size={18} />,
    },
  ];

  // Active эсэхийг шалгах функц
  const isActiveRoute = (href: string) => {
    if (href === "/") {
      // Root зам нь зөвхөн яг "/" үед л active болно
      return pathname === "/";
    }
    // Бусад замууд нь тухайн замаар эхлэх үед active болно
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-80 h-screen bg-[#181719] text-gray-400 flex flex-col justify-between py-6">
      <div>
        <div className="flex items-center gap-2 px-6 mb-10">
          <h1 className="text-lg font-semibold text-orange-600">ATM System</h1>
        </div>
        <nav className="flex flex-col gap-3 mt-4">
          {navItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 relative transition
                  ${isActive ? "bg-[#2c2c2d] text-white" : "hover:bg-[#212123]"}
                `}
              >
                {isActive && (
                  <span className="absolute right-0 top-0 bottom-0 w-[2px] bg-orange-600" />
                )}
                {item.icon}
                <span className="text-[16px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-3 px-4">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">B</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">Булганым</p>
          <p className="text-xs text-gray-400">Админ</p>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </aside>
  );
}

export default Sidebar;