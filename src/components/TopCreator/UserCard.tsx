"use client";
import followApi from "@/api/follow/follow.api";
import { useSnackbar } from "@/context/SnackbarContext";
import { IUser } from "@/interface/user.interface";
import useUserStore from "@/store/userStore";
import { Avatar, Button } from "@mui/material";
import React from "react";
interface Iprops {
  width?: string;
  user?: IUser;
  onFollowSuccess?: () => void;
}
const UserCard = ({ width, user, onFollowSuccess }: Iprops) => {
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const userStore = useUserStore((state) => state.user);

  const handleFollow = async (followed_id: string | undefined) => {
    try {
      await followApi.create({
        following_user_id: userStore?.id,
        followed_user_id: followed_id,
      });
      showSnackbar("Follow success", "success");
      if (onFollowSuccess) {
        onFollowSuccess();
      }
    } catch (error: any) {
      console.log("🚀 ~ handleFollow ~ error:", error);
      showSnackbar("follow error", "error");
    }
  };
  return (
    <div
      className="flex flex-col items-center gap-2 p-6  rounded-[20px] border-[#1F1F22] border-solid"
      style={{
        border: "1px solid #1F1F22",
        width,
      }}
    >
      <Avatar src={user?.picture}>K</Avatar>
      <p className="text-[14px]">{user?.name}</p>
      <p className="text-[10px] text-light_3">{user?.bio}</p>
      <Button
        variant="contained"
        className="bg-primary w-[74px] text-[12px]"
        onClick={() => handleFollow(user?.id)}
      >
        Follow
      </Button>
      <SnackbarComponent />
    </div>
  );
};

export default UserCard;
