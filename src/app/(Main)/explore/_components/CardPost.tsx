import React from "react";
import { ExploreCardPost } from "@/app/assets";
import Image from "next/image";
interface IProps {
  image :string
}
const CardPost:React.FC<IProps> = ({image}) => {
  return <div className="max-w-[340px] w-full">
    <Image src={image} alt="img" width={340} height={400}/>
  </div>;
};

export default CardPost;
