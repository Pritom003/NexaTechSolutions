"use client";

import { Toaster } from "react-hot-toast";
import UserProvider from "../context/useContext";
// import Navbar from "@/Component/shared/Navbar";




const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
     
      <Toaster  position="top-right" />

    {children}
    </UserProvider>
  );
};

export default Providers;