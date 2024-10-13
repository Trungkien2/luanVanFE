import Image from "next/image";
import LoginFrom from "./_components/LoginFrom";
import { Logo } from "@/app/assets";

export default function LoginPage() {
  return (
    <div>
      <Image src={Logo} alt="logo" />
      <h1 className="text-[30px] font-bold leading-[42px] mt-[68px]">
        Log in to your account
      </h1>
      <p className="text-light_3 text-[16px]">
        Welcome back! Please enter your details.
      </p>
      <LoginFrom />
    </div>
  );
}
