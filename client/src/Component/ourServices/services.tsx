/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchServices } from "@/services/ServiceApis";

type Service = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

const ServicesSlider = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchServices();
        setServices(
          data.map((service: any) => ({
            _id: service._id,
            title: service.title,
            description: service.description,
            image: typeof service.image === "string" ? service.image : "",
          }))
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    })();
  }, []);

  return (
    <section className="py-16 px-6 md:px-20 bg-white text-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-orange-500">Our Services</h2>
        <p className="text-lg mt-2 text-gray-600">Explore the areas we specialize in</p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          500: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
      >
        {services.map((service) => (
          <SwiperSlide key={service._id}>
            <div
              className="group relative h-[300px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Orange overlay */}
              <div className="absolute inset-0 bg-orange-500/40 transition-opacity group-hover:bg-orange-300/30" />

              {/* Bottom content container */}
              <div className="absolute bottom-0 left-0 w-full p-4 z-10 bg-black/40 group-hover:bg-black/70 transition-all">
                {/* Title */}
                <h3 className="text-white text-xl font-bold transition-transform duration-300 group-hover:-translate-y-4">
                  {service.title}
                </h3>

                {/* Description appears on hover */}
                <p className="text-sm text-white mt-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-24 transition-all duration-300 line-clamp-3">
                  {service.description}
                </p>

                {/* More button */}
                <button className="text-white mt-2 text-xs underline opacity-0 group-hover:opacity-100 transition duration-300">
                  Read more...
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots below the slider */}
      <div className="custom-swiper-pagination mt-6 flex justify-center space-x-2" />
    </section>
  );
};

export default ServicesSlider;
