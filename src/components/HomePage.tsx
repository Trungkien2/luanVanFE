"use client";
import CardPost from "./CardPost/CardPost";

import { MainPost } from "@/app/assets";
import { useRouter } from "next/navigation";


const HomePage = () => {
  const router = useRouter();
  const fakePost = {
    userAvatar: "/path/to/avatar.jpg", // đường dẫn ảnh avatar
    userName: "Lewis Hamilton",
    date: "26 June at 09:32 PM",
    content: "It's a big world out there - explore! #nature #mountains",
    image: MainPost, // đường dẫn ảnh bài viết
    likes: 120,
    comments: 68,
    shares: 74,
  };
  return (
    <div className="pt-[48px] flex-1 px-[52px] overflow-y-auto scrollbar-none">
     
      <h1 className="text-[24px] font-bold">Home Feed</h1>
      <div className="mt-[40px]">
        <CardPost post={fakePost} />
      </div>
  
    </div>
  );
};

export default HomePage;
