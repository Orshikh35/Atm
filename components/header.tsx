"use client";
import React from "react";
import {  ChevronDown } from "lucide-react";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/70 border-b border-white/30 shadow-sm px-20">
      <div className="w-full h-16 flex justify-between items-center px-6">
        {/* Logo/Branding */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-sm">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ATM System
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex gap-16 items-center h-full px-4">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative group">
            <span>АТМ</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative group">
            <span>ATMSparePart</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative group">
            <span>Customers</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>
        
        {/* User Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 pl-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-sm">
              <span className="text-white font-medium text-xs">БО</span>
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700">Б.Орших</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;