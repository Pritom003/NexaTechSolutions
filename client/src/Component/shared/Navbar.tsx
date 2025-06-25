"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Use lucide icons or replace with your own
import lgogo from '../../../public/Images/Nexatechlogo.png';
import Image from "next/image";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-10 left-8 right-8 flex justify-between items-center h-16 z-20">
      {/* Left section (Logo + Name) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-1/5 bg-black/70 text-white rounded-r-2xl flex items-center px-4"
      >
        <div className="text-xl font-bold tracking-wider">
            <Image src={lgogo} alt="Logo" width={50} height={50} className="mr-2" />
            NexaTech</div>
      </motion.div>

      {/* Desktop Menu */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className=" md:flex hidden bg-black px-4 py-2 
          text-white border border-white rounded-full items-center md:px-6 space-x-6"
      >
        <Link href="/" className="hover:underline">Home</Link>

        <Link href="/dashboard" className="hover:underline">dashboard</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
                <Link href="/login" className="hover:underline">Login</Link>
      </motion.div>

      {/* Mobile Burger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 right-8 w-48 bg-orange-500 text-white border border-white rounded-2xl p-4 flex flex-col gap-4 md:hidden z-30"
          >
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:underline">Home</Link>
     
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="hover:underline">dashboard</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:underline">Contact</Link>
                   <Link href="/login" onClick={() => setIsOpen(false)} className="hover:underline">Login</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
