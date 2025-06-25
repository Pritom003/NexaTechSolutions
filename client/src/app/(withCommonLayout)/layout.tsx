// app/(withCommonLayout)/layout.tsx
import Footer from "@/Component/shared/footer";
import Navbar from "@/Component/shared/Navbar";


export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />  
      {children}
      <Footer/>
    </>
  );
}
