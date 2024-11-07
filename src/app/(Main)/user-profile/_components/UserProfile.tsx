"use client";
import { EditIcon } from "@/app/assets";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";

const UserProfile = () => {
  return (
    <div className="mt-5">
      <div className="flex gap-7">
        <Avatar className="w-[150px] h-[150px]">K</Avatar>
        <div>
          <div className="flex gap-8">
            <h1 className="text-[36px] font-semibold">Lewis Hamilton</h1>
            <div className="flex gap-1 item text-[14px] rounded-xl bg-dark_3 px-[20px] py-[10px] hover:opacity-50 cursor-pointer">
              <Image src={EditIcon} alt="icon" width={16} height={16} />{" "}
              <p className="leading-[30px]">Edit profile</p>
            </div>
          </div>
          <p className="text-[18px] text-light_3">@Lewishamilton</p>
          <div className="flex items-center gap-10 mt-3 mb-3">
            <div className="text-[18px] ">
              <p className="text-primary">273</p>
              <p>Posts</p>
            </div>
            <div className="text-[18px]">
              <p className="text-primary">273</p> Followers
            </div>
            <div className="text-[18px]">
              <p className="text-primary">151</p> <p>Following</p>
            </div>
          </div>

          <p className="text-[18px]">🌿 Capturing the essence of nature through my lens <br/>
          ✨ "In every walk with nature, one receives far more than he seeks." - John Muir</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
