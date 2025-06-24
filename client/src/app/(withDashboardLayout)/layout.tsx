"use client";

import React, { useState } from "react";
import {
  User,
  LayoutDashboard,
  ImageIcon,
  Hammer,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaUser } from "react-icons/fa";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [uiMenuOpen, setUiMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-black text-orange-500
       w-full md:max-w-44 md:h-screen flex md:flex-col items-center md:items-start px-4 py-6 space-y-6">
        {/* User Image */}
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 flex justify-center align-middle items-center border-orange-500">
          {/* <img
            src="/user.png" // Replace with dynamic image if needed
            alt="User"
            className="w-full h-full object-cover"
          /> */}
          <FaUser></FaUser>
        </div>

        {/* Navigation */}
        <nav className="flex md:flex-col gap-4 sm:gap-6 w-full text-sm">
          <a href="/dashboard/profile" className="flex items-center gap-2 hover:text-white transition">
            <User className="w-5 h-5" /> Profile
          </a>

          {/* UI Edit dropdown */}
          <div>
            <button
              onClick={() => setUiMenuOpen(!uiMenuOpen)}
              className="flex items-center gap-2 hover:text-white transition w-full"
            >
              <LayoutDashboard className="w-5 h-5" />
              Update-UI
              {uiMenuOpen ? <ChevronUp className="ml-auto w-4 h-4" /> : <ChevronDown className="ml-auto w-4 h-4" />}
            </button>

            {uiMenuOpen && (
              <div className="ml-6 mt-2 flex flex-col gap-2 text-orange-400">
                <a href="/dashboard/update-ui/update-hero" className="flex items-center gap-2 hover:text-white transition">
                  <ImageIcon className="w-4 h-4" />
                  Banner
                </a>
                <a href="/dashboard/services" className="flex items-center gap-2 hover:text-white transition">
                  <Hammer className="w-4 h-4" />
                  Services
                </a>
                <a href="/dashboard/more" className="flex items-center gap-2 hover:text-white transition">
                  <MoreHorizontal className="w-4 h-4" />
                  More
                </a>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
