import { headers } from 'next/headers';
import { LogoMain } from "@/app/assets";
import {
  HomeIcon,
  UserIcon,
  BookmarkIcon,
  ChatIcon,
  CogIcon,
  LogoutIcon,
  ArchiveIcon
} from "@heroicons/react/outline";
import { Avatar } from "@mui/material";
import Image from "next/image";

export default function Sidebar() {
  const headersList = headers();
  const pathname = headersList.get("x-next-url") || "/"; // Lấy đường dẫn từ header

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Explore", href: "/Explore", icon: ArchiveIcon },
    { name: "People", href: "/people", icon: UserIcon },
    { name: "Saved", href: "/saved", icon: BookmarkIcon },
    { name: "Chats", href: "/chats", icon: ChatIcon },
   
  ];

  const navItems2 = [
    { name: "Settings", href: "/settings", icon: CogIcon },
    { name: "Logout", href: "/logout", icon: LogoutIcon },
  ]

  return (
    <div className="bg-dark_2 pt-[48px] px-6 min-h-screen w-[270px]">
      <div className="mb-8">
        <Image src={LogoMain} alt="logo" />
      </div>
      <div className="my-11 flex gap-3">
        <Avatar>H</Avatar>
        <div>
          <p className="text-[18px] font-bold">Lewis Hamilton</p>
          <p className="text-[14px] text-light_3">@Lewishamilton</p>
        </div>
      </div>
    <div className='flex flex-col gap-12'>
    <nav className="flex flex-col space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href; // Kiểm tra active
          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center p-2 ${
                isActive
                  ? "bg-purple-700 text-white font-bold"
                  : "text-white hover:bg-gray-700"
              } rounded-lg h-[56px]  text-lg`}
            >
              <Icon className="w-6 h-6 mr-2" />
              {item.name}
            </a>
          );
        })}
      </nav>

      <nav className="flex flex-col space-y-4">
        {navItems2.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href; // Kiểm tra active
          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center p-2 ${
                isActive
                  ? "bg-purple-700 text-white font-bold"
                  : "text-white hover:bg-gray-700"
              } rounded-lg h-[56px]  text-lg`}
            >
              <Icon className="w-6 h-6 mr-2" />
              {item.name}
            </a>
          );
        })}
      </nav>
    </div>
    </div>
  );
}
