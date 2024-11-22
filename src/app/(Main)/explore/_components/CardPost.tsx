import React from "react";
import { ExploreCardPost } from "@/app/assets";
import Image from "next/image";
interface IProps {}
const CardPost = () => {
  return <div className="max-w-[340px] w-full">
    <Image src={ExploreCardPost} alt="img" width={340}/>
  </div>;
};

export default CardPost;
