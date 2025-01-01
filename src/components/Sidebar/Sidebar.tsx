"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { galleryAddIcon, LogoMain } from "@/app/assets";
import {
  HomeIcon,
  UserIcon,
  BookmarkIcon,
  ChatIcon,
  CogIcon,
  LogoutIcon,
  ArchiveIcon,
} from "@heroicons/react/outline";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { ROUTER_WEB } from "@/util/route";
import useUserStore from "@/store/userStore";

export default function Sidebar() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();
  const pathname = usePathname(); // Lấy pathname từ usePathname
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    clearUser()

    window.location.href = "/login";
  };
  const navItems = [
    { name: "Home", href: ROUTER_WEB.HOME_PAGE, icon: HomeIcon },
    { name: "Explore", href: ROUTER_WEB.EXPLORE, icon: ArchiveIcon },
    { name: "People", href: ROUTER_WEB.PEOPLE, icon: UserIcon },
    // { name: "Saved", href: ROUTER_WEB.SAVED, icon: BookmarkIcon },
    { name: "Reels", href: ROUTER_WEB.REELS, icon: ArchiveIcon },
    { name: "Chats", href: ROUTER_WEB.CHATS, icon: ChatIcon },
    {
      name: "Create post",
      href: ROUTER_WEB.CREATE_POST,
      icon: galleryAddIcon,
      customImg: true,
    },
  ];

  const navItems2 = [
    // { name: "Settings", href: ROUTER_WEB.SETTINGS, icon: CogIcon },
    {
      name: "Logout",
      func: handleLogout,
      icon: LogoutIcon,
      type: "func",
      href: "#",
    },
  ];

  return (
    <div className="bg-dark_2 pt-[48px] px-6 min-h-screen w-[270px] h-screen sticky overflow-hidden top-0 overflow-scroll">
      <div className="mb-8">
        <Image src={LogoMain} alt="logo" />
      </div>
      <div
        className="my-11 flex gap-3 cursor-pointer"
        onClick={() => router.push(ROUTER_WEB.USER_PROFILE)}
      >
        <Avatar src={user?.picture}>H</Avatar>
        <div>
          <p className="text-[18px] font-bold">{user?.name}</p>
          <p className="text-[14px] text-light_3">{user?.user_name}</p>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-2 ${
                  isActive
                    ? "bg-purple-700 text-white font-bold"
                    : "text-white hover:bg-gray-700"
                } rounded-lg h-[56px] text-lg`}
              >
                {item.customImg ? (
                  <Image src={item.icon} alt="icon" className="w-6 h-6 mr-2" />
                ) : (
                  <Icon className="w-6 h-6 mr-2" />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <nav className="flex flex-col space-y-4">
          {navItems2.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center p-2 ${
                  isActive
                    ? "bg-purple-700 text-white font-bold"
                    : "text-white hover:bg-gray-700"
                } rounded-lg h-[56px] text-lg`}
                onClick={() => {
                  if (item.type === "func") {
                    handleLogout();
                  }
                }}
              >
                <Icon className="w-6 h-6 mr-2" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
