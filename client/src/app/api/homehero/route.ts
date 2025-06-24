import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      title: "Web Development",
      subtitle: "Building fast, responsive, modern websites.",
      image: "/Images/3496219.jpg",
    },
    {
      title: "Mobile App Design",
      subtitle: "Crafting intuitive mobile experiences.",
      image:  "/Images/mobile.png",
    },
    {
      title: "SEO Optimization",
      subtitle: "Helping your business rank on search engines.",
      image:  "/Images/Screenshot 2025-06-24 185313.png",
    },
  ];
  return NextResponse.json(data);
}
