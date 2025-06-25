/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchBanners } from "@/services/BannerServices";

type Slide = {
  title: string;
  subtitle: string;
  image: string;
};

export default function Hero() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchBanners();
        setSlides(
          data.map((banner: any) => ({
            title: banner.title,
            subtitle: banner.subtitle,
            image: typeof banner.image === "string" ? banner.image : ""
          }))
        );
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  const current = slides[index];
  if (!current) return null;

  return (
    <div className="relative w-full h-[80vh] bg-black text-white flex overflow-hidden justify-between">
      <div className="absolute inset-0 z-0 animate-dotPattern bg-black/80 pointer-events-none" />

      {/* Left content */}
      <div className="relative z-10 w-1/2 flex flex-col justify-center px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="lg:text-8xl sm:text-5xl xs:text-3xl font-bebas text-orange-500 mb-4 xs:mb-0">
              {current.title}
            </h1>
            <p className="sm:text-lg md:text-xl xs:text-xs font-robotoCondensed">
              {current.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right image */}
      <div className="relative z-10 flex mt-20 justify-center items-center">
        <div className="sm:w-[250px] xs:w-[180px] md:w-[300px] min-h-[250px] py-4 border-l-8 border-orange-500 rounded-l-full overflow-hidden flex justify-center items-center">
          <motion.img
            key={current.image}
            src={current.image}
            alt={current.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
