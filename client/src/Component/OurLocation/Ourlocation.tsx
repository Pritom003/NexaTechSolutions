"use client";

import React from "react";

const OurLocation = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-white text-gray-900">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-orange-500">Our Location</h2>
        <p className="text-lg mt-2 text-gray-600">
          Visit our office or find us on the map below
        </p>
      </div>

      <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-orange-300">
        <iframe
          title="NexaTech Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9015096984073!2d90.39067207519143!3d23.75088508866242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7bd7f8c2341%3A0xb6a997d6d632ffeb!2sDhanmondi%20Rd%2032%2C%20Dhaka%201209!5e0!3m2!1sen!2sbd!4v1719290400000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </section>
  );
};

export default OurLocation;
