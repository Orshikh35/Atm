"use client";

import React from "react";
import {
  ChevronRight,
  Home,
  Users,
  FileText,
  Wrench,
  Laptop,
  Building,
  Package,
  User
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  if (!session?.user?.menu) return null;

  const menuItems = session.user.menu;

  // Route active эсэх шалгалт
  const isActiveRoute = (href: string) => {
    return pathname.startsWith(href);
  };

  // Icon switch function
  const getIconByUrl = (url: string) => {
    switch (url) {
      case "/dashboard":
        return <Home size={18} />;
      case "/devices":
        return <Laptop size={18} />;
      case "/spareParts":
        return <Package size={18} />;
      case "/user":
        return <Users size={18} />;
      case "/organization":
        return <Building size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  return (
    <aside className="w-80 h-screen flex flex-col justify-between py-6 backdrop-blur-lg bg-opacity-20 border border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 px-6 mb-10">
          <h1 className="text-lg font-semibold text-white drop-shadow-lg">ATM System</h1>
        </div>

        <nav className="flex flex-col gap-4 mt-4">
          {menuItems.map((item: any) => {
            const fullUrl = `/home${item.url}`;
            const isActive = isActiveRoute(fullUrl);

            return (
              <Link
                key={item.id}
                href={fullUrl}
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
                <span className="drop-shadow-sm">{getIconByUrl(item.url)}</span>
                <span className="text-[16px] font-medium drop-shadow-sm">{item.nameMn}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 pl-4 py-3 ml-3 rounded-l-xl relative transition-all duration-300 backdrop-blur-sm">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-lg border border-white/20">
          <span className="text-white font-semibold text-sm drop-shadow-sm">
            {session?.user?.name?.charAt(0) ?? "?"}
          </span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white drop-shadow-sm">{session?.user?.name}</p>
          <p className="text-xs text-white/70 drop-shadow-sm">
            {session?.user?.role === "ADMIN" ? "Админ" : session?.user?.role}
          </p>
        </div>
        <ChevronRight size={16} className="text-white/70 drop-shadow-sm" />
      </div>
    </aside>
  );
}

export default Sidebar;
