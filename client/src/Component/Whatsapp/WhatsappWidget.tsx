import Link from "next/link";
// import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappWidget = () => {
  return (
    <Link
      href="https://wa.me/8801629252634"
      target="_blank"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 
        text-white p-4 rounded-full shadow-lg transition-all"
    >
<FaWhatsapp size={24}></FaWhatsapp>
    </Link>
  );
};

export default WhatsappWidget;
// 