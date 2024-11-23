"use client";
import { EditIcon } from "@/app/assets";
import StoryList from "@/components/StoryList/StoryList";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import ButtonGroupCustom from "./ButtonGroup";
import CardPost from "../../explore/_components/CardPost";
import { useRouter } from "next/navigation";
import { ROUTER_WEB } from "@/util/route";
import useUserStore from "@/store/userStore";
interface IProps {
  isOtherProfile?: boolean;
}

const UserProfile: React.FC<IProps> = ({ isOtherProfile = false }) => {
  const user = useUserStore((state) => state.user);

  const router = useRouter();
  return (
    <div className="mt-5">
      <div className="flex gap-7">
        <Avatar
          className="w-[150px] h-[150px]"
          src={user?.picture}
        >
          K
        </Avatar>
        <div>
          <div className="flex gap-8">
            <h1 className="text-[36px] font-semibold">
              {isOtherProfile ? "Lewis Hamilton" : user?.name}
            </h1>
            {isOtherProfile ? (
              <div className="flex gap-3">
                <div className="px-[20px] py-[10px] bg-primary text-white rounded-lg flex justify-center items-center cursor-pointer">
                  Follow
                </div>
                <div className="px-[20px] py-[10px] bg-white text-black rounded-lg flex justify-center items-center cursor-pointer">
                  Message
                </div>
              </div>
            ) : (
              <div className="flex gap-1 item text-[14px] rounded-xl bg-dark_3 px-[20px] py-[10px] hover:opacity-50 cursor-pointer">
                <Image src={EditIcon} alt="icon" width={16} height={16} />{" "}
                <p
                  className="leading-[30px]"
                  onClick={() => router.push(`${ROUTER_WEB.EDIT_PROFILE}/${user?.id}`)}
                >
                  Edit profile
                </p>
              </div>
            )}
          </div>
          <p className="text-[18px] text-light_3">{user?.user_name}</p>
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

          <p className="text-[18px]">
           {user?.bio}
          </p>
          {/* <StoryList /> */}
        </div>
      </div>
      <div className="mt-[68px]">
        <ButtonGroupCustom />
      </div>
      <div className="mt-3 flex gap-10 flex-wrap">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((item) => (
          <CardPost />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
