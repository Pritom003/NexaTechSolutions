'use client';

import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { getCurrentUser } from "@/services/Authservice"; // Adjust path if needed

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [uiMenuOpen, setUiMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Get the role from the current user info
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUserRole(user?.role || null);
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-black text-orange-500 w-full md:max-w-44 md:h-screen flex md:flex-col items-center md:items-start px-4 py-6 space-y-6">
        {/* User Image */}
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 flex justify-center align-middle items-center border-orange-500">
          <FaUser />
        </div>

        {/* Navigation */}
        <nav className="flex md:flex-col gap-4 sm:gap-6 w-full text-sm">
          {/* Always show Profile */}
          <Link href="/dashboard/profile" className="flex items-center gap-2 hover:text-white transition">
            <User className="w-5 h-5" /> Profile
          </Link>

          {/* Admin-only UI menu */}
          {userRole === 'admin' && (
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
                  <Link href="/dashboard/admin/update-hero" className="flex items-center gap-2 hover:text-white transition">
                    <ImageIcon className="w-4 h-4" />
                    Banner
                  </Link>
                  <Link href="/dashboard/admin/update-service" className="flex items-center gap-2 hover:text-white transition">
                    <Hammer className="w-4 h-4" />
                    Services
                  </Link>
                  <Link href="/" className="flex items-center gap-2 hover:text-white transition">
                    <MoreHorizontal className="w-4 h-4" />
                    More
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
