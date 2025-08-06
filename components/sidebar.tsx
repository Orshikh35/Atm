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
    <aside className="w-80 h-screen flex flex-col justify-between py-6  backdrop-blur-lg bg-opacity-20 border border-white/10 shadow-2xl">
      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md "></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 px-6 mb-10">
          <h1 className="text-lg font-semibold text-white drop-shadow-lg">ATM System</h1>
        </div>
        <nav className="flex flex-col gap-4 mt-4">
          {navItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 pl-4 py-3 ml-3 rounded-l-xl relative transition-all duration-300 backdrop-blur-sm
                  ${isActive 
                    ? "bg-white/20 text-white shadow-lg border border-white/20" 
                    : "hover:bg-white/10 text-white/80 hover:text-white border border-transparent hover:border-white/10"
                  }
                `}
              >
                {isActive && (
                  <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-white rounded-l-full shadow-lg" />
                )}
                <span className="drop-shadow-sm">{item.icon}</span>
                <span className="text-[16px] font-medium drop-shadow-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 pl-4 py-3 ml-3 rounded-l-xl relative transition-all duration-300 backdrop-blur-sm">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-lg border border-white/20">
          <span className="text-white font-semibold text-sm drop-shadow-sm">B</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white drop-shadow-sm">Булганым</p>
          <p className="text-xs text-white/70 drop-shadow-sm">Админ</p>
        </div>
        <ChevronRight size={16} className="text-white/70 drop-shadow-sm" />
      </div>
    </aside>
  );
}

export default Sidebar;