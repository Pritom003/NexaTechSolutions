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
  Key,
  Home,
  MessageCircle,
} from "lucide-react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useUser } from "../context/useContext";
import { useRouter } from "next/navigation";

import { deleteCookie } from "cookies-next";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [uiMenuOpen, setUiMenuOpen] = useState(false);
  const router = useRouter();

const {setUser  }=useUser()
// console.log(user);
  const handleLogout = () => {
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    setUser(null)
    router.push("/login");
  }
   
  return (
    <div className="min-h-screen  md:h-screen md:overflow-hidden flex flex-col md:flex-row">
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
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-white transition">
            <User className="w-5 h-5" /> Profile
          </Link>
          <Link href="/" className="flex items-center gap-2 hover:text-white transition">
            <Home className="w-5 h-5" /> Home
          </Link>

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
          <Link href="/dashboard/admin/contact-message" className="flex items-center gap-2 hover:text-white transition">
                  <MessageCircle className="w-4 h-4" />
                  Contact Messages
                </Link>
          <button onClick={handleLogout}className="flex items-center gap-2 hover:text-white transition">
           <Key className="w-5 h-5" /> logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
