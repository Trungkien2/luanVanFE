"use client";
import favoriteApi from "@/api/favorite/favorite.api";
import postApi from "@/api/post/post.api";
import {
  chatIcon,
  EditIcon,
  likePost,
  savePostIcon,
  likedPost,
} from "@/app/assets";
import { IPost } from "@/interface/post.interface";
import useUserStore from "@/store/userStore";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
interface IProps {
  post: IPost;
}
const CardPost: React.FC<IProps> = ({ post }) => {
  const mediaParse: string[] = JSON.parse(JSON.parse(post?.media as string));
  const user = useUserStore((state) => state.user);
  const [isLiked, setIsLiked] = React.useState(!!post.isLiked);
  const [likeCount, setLikeCount] = React.useState(post.like_count);
  const handleLike = async () => {
    try {
      await favoriteApi.create({
        user_id: user?.id,
        post_id: post?.id,
      });

      // Cập nhật lại trạng thái
      setIsLiked((prev) => !prev); // Đảo trạng thái
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleUnLike = async () => {
    try {
      await postApi.unlike(post?.id);

      setIsLiked((prev) => !prev); // Đảo trạng thái
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };



  return (
    <div className="bg-dark_2 text-white py-[36px] px-[29px] rounded-xl  border-dark_4 mb-[40px]">
      <div className="flex justify-between">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar src={post?.user?.picture} />
          <div>
            <h2 className="text-lg font-semibold">{post?.user?.name}</h2>
            <p className="text-sm text-gray-500">
              {post.created_at_unix_timestamp}
            </p>
          </div>
        </div>
        {post?.user?.id === user?.id && (
          <Image
            src={EditIcon}
            alt="icon"
            width={17}
            height={17}
            className="cursor-pointer"
          />
        )}
      </div>

      <p className="mb-4 text-gray-300">{post.body}</p>
      {mediaParse?.length > 0 ? (
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {mediaParse?.map((item) => (
            <SwiperSlide>
              <Image
                src={item}
                alt="Post image"
                width={600}
                height={300}
                className="rounded-lg mb-4 w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Image
          src={mediaParse?.[0]}
          alt="Post image"
          width={600}
          height={300}
          className="rounded-lg mb-4 w-full"
        />
      )}

      <div className="flex items-center justify-between text-gray-500 mx-4">
        <span className="flex items-center space-x-2">
          <span className="flex items-center gap-1">
            {" "}
            <Image
              src={isLiked ? likedPost : likePost}
              alt="icon"
              onClick={()=> isLiked ?handleUnLike() : handleLike()}
              className="cursor-pointer"
            />
            {likeCount}
          </span>
          <span className="flex items-center gap-1">
            <Image src={chatIcon} alt="icon" />
            {post.comment_count}
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
