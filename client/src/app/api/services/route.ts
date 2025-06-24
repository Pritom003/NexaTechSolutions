import { NextResponse } from "next/server";

export async function GET() {
  const data =// Example data from /api/services
[
  {
    "_id": "1",
    "title": "Web Development",
    "description": "Modern web apps using React and Next.js",
     image: "/Images/3496219.jpg",
  },
  {
    "_id": "2",
    "title": "API Integration",
    "description": "Smooth and secure third-party API setups",
        image: "/Images/group-young-business-people-working-office.jpg",
  },
  {
    "_id": "3",
    "title": "UI/UX Design",
    "description": "Pixel-perfect, user-centered design",
      image: "/Images/group-young-business-people-working-office.jpg",
  },
  {
    "_id": "4",
    "title": "SEO Optimization",
    "description": "Boost your search rankings effectively",
      image: "/Images/group-young-business-people-working-office.jpg",
  },
  {
    "_id": "5",
    "title": "DevOps Setup",
    "description": "Automated deployments with Docker & CI/CD",
      image: "/Images/group-young-business-people-working-office.jpg",
  }
]


  return NextResponse.json(data);
}
