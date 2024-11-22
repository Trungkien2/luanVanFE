import { Avatar, Button } from "@mui/material";
import React from "react";
interface Iprops {
  width? : string
}
const UserCard = ({width}:Iprops) => {
  return (
    <div
      className="flex flex-col items-center gap-2 p-6  rounded-[20px] border-[#1F1F22] border-solid"
      style={{
        border: "1px solid #1F1F22",
        width
      }}
    >
      <Avatar>K</Avatar>
      <p className="text-[14px]">Savannah Nguyen</p>
      <p className="text-[10px] text-light_3">Followed by jsmastery</p>
      <Button variant="contained" className="bg-primary w-[74px] text-[12px]">
        Follow
      </Button>
    </div>
  );
};

export default UserCard;
