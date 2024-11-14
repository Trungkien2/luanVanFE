import { StoryImage } from "@/app/assets";
import Image from "next/image";
import React from "react";

const StoryList = () => {
  return (
    <div className="mt-[40px] flex gap-[42px]">
      {Array.from({ length: 5 }, (_, index) => index + 1).map((item) => (
        <div className="cursor-pointer">
          {" "}
          <Image
            src={StoryImage}
            alt="image"
            style={{ border: "2.73px solid #7878A3" }}
            className="rounded-full"
          />
          <p className="text-center mt-2">BTS</p>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
