// components/CardPost.js
// import { IPost } from "@/interface/post.interface";
import {
  chatIcon,
  EditIcon,
  likePost,
  savePostIcon
} from "@/app/assets";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
interface IProps {
  post: any;
}
const CardPost: React.FC<IProps> = ({ post }) => {
  return (
    <div className="bg-dark_2 text-white py-[36px] px-[29px] rounded-xl  border-dark_4 mb-[40px]">
      <div className="flex justify-between">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar />
          <div>
            <h2 className="text-lg font-semibold">{post.userName}</h2>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
        </div>
        <Image src={EditIcon} alt="icon" width={17} height={17} />
      </div>

      <p className="mb-4 text-gray-300">{post.content}</p>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          {" "}
          <Image
            src={post.image}
            alt="Post image"
            width={600}
            height={300}
            className="rounded-lg mb-4 w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src={post.image}
            alt="Post image"
            width={600}
            height={300}
            className="rounded-lg mb-4 w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src={post.image}
            alt="Post image"
            width={600}
            height={300}
            className="rounded-lg mb-4 w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src={post.image}
            alt="Post image"
            width={600}
            height={300}
            className="rounded-lg mb-4 w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src={post.image}
            alt="Post image"
            width={600}
            height={300}
            className="rounded-lg mb-4 w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src={post.image}
            alt="Post image"
            width={600}
            height={300}
            className="rounded-lg mb-4 w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src={post.image}
            alt="Post image"
            width={600}
            height={300}
            className="rounded-lg mb-4 w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src={post.image}
            alt="Post image"
            width={600}
            height={300}
            className="rounded-lg mb-4 w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src={post.image}
            alt="Post image"
            width={600}
            height={300}
            className="rounded-lg mb-4 w-full"
          />
        </SwiperSlide>
      </Swiper>

      <div className="flex items-center justify-between text-gray-500 mx-4">
        <span className="flex items-center space-x-2">
          <span className="flex items-center gap-1">
            {" "}
            <Image src={likePost} alt="icon" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <Image src={chatIcon} alt="icon" />
            {post.comments}
          </span>
          {/* <span className="flex items-center gap-1">
            <Image src={shareIcon} alt="icon" /> {post.shares}
          </span> */}
        </span>
        <Image src={savePostIcon} alt="icon" />
      </div>
    </div>
  );
};

export default CardPost;
