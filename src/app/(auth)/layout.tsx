import Image from "next/image";
import { Image1 } from "../assets";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <>
    <div className="flex justify-between">
      <div className="ml-[177px] mt-[193px]"> {children}</div>
      <Image src={Image1} alt="image-1" />
    </div>
   
    
    </>
  );
}
