import type { Metadata } from "next";

import { Bebas_Neue, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Providers from "./provider/provider";
// import Navbar from "@/Component/shared/Navbar";

// import Providers from "./provider/provider";


const bebasNeue = Bebas_Neue({
  weight: "400", // Bebas Neue only has one weight
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const robotoCondensed = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
});


export const metadata: Metadata = {
  title: "NexaTech Solutions",
  description: " Your one-stop solution for web development, mobile apps, and digital marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`max-w-[2100px] mx-auto ${bebasNeue.variable} ${robotoCondensed.variable} font-sans`}>
        <Providers>
         
  {children}
        </Providers>
      
      </body>
    </html>
  );
}
