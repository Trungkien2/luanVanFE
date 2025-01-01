"use client";
import {
  ExploreCardPost,
  EditIcon,
  TrashBin2,
  ArrowIcon,
  likedPost,
  likePost,
  chatIcon,
} from "@/app/assets";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRespone, PostFollowResponse } from "@/interface/respone.interface";
import { POST_BY_EXPLORE } from "@/util/queryKey";
import postApi from "@/api/post/post.api";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { ROUTER_WEB } from "@/util/route";
import { IPost } from "@/interface/post.interface";
import { Swiper, SwiperSlide, } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import dayjs from "dayjs";
import useUserStore from "@/store/userStore";
import favoriteApi from "@/api/favorite/favorite.api";
import commentApi from "@/api/comment/comment.api";
import { IComment } from "@/interface/comment.interface";

interface IProps {
  postId?: string;
}
const PostDetail: React.FC<IProps> = ({ postId }) => {
  const router = useRouter();
  const { user } = useUserStore();
  const [postData, setPostData] = useState<IPost | null>(null);
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<IComment[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  const { data, fetchNextPage, hasNextPage, isLoading, isError, refetch } =
    useInfiniteQuery<PostFollowResponse>({
      queryKey: [POST_BY_EXPLORE],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await postApi.getPostExolore({
          fields: ["$all"],
          limit: 10,
          page: pageParam as number,
        });
        return response;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.pagination) return undefined;
        const { currentPage, totalPages } = lastPage.pagination;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  const posts = data?.pages.flatMap((page) => page?.rows) || [];

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };


    const handleLike = async () => {
      try {
        await favoriteApi.create({
          user_id: user?.id,
          post_id: postData?.id,
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
        await postApi.unlike(postData?.id as string);
  
        setIsLiked((prev) => !prev); // Đảo trạng thái
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    };
  

  useEffect(() => {
    const fetchPostData = async () => {
      const id = postId;
      if (id) {
        const data: any = await postApi.findOne(id, {
          fields: ["$all", { user: ["$all"] }],
        });
        console.log("🚀 ~ fetchPostData ~ data:", data);
        setPostData(data);
        setIsLiked(data.isLiked);
        setLikeCount(data.totalLikes);
      }
    };
    fetchPostData();
  }, [postId]);

  const {
    data: commentData,
    fetchNextPage: fetchNextCommentPage,
    hasNextPage: hasNextCommentPage,
    refetch: refetchComment,
  } = useInfiniteQuery<IRespone<IComment>>({
    queryKey: ["comments", postId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await commentApi.getList<IRespone<IComment>>({
        fields: ["$all",{user : ["$all"]}],
        limit: 10,
        page: pageParam as number,
        where: { post_id: postId },
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination) return undefined;
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  useEffect(() => {
    if (commentData) {
      setComments(commentData.pages.flatMap((page) => page?.rows) || []);
    }
  }, [commentData]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;
    try {
      await commentApi.create({
        user_id: user?.id,
        post_id: postId,
        content: newComment,
      });
      setNewComment("");
      // Optionally, refetch comments here
      refetchComment();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleReply = (username: string) => {
    setNewComment(`@${username} `);
  };

  const handleDelete = async () => {
    try {
      await postApi.delete(postData?.id as string);
      setConfirmOpen(false);
      router.back() // Redirect after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          {postData?.media && (
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
              {(() => {
                let mediaParse: string[] = [];
                try {
                  mediaParse = JSON.parse(JSON.parse(postData?.media as string));
                } catch (error) {
                  console.error("Error parsing media:", error);
                }
                return mediaParse.map((item: string) => (
                  <SwiperSlide key={item}>
                    {item.endsWith(".mp4") ? (
                      <video controls className="rounded-lg mb-4 w-full cursor-pointer">
                        <source src={item} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={item}
                        alt="Post media"
                        width={600}
                        height={300}
                        className="rounded-lg mb-4 w-full cursor-pointer"
                        onClick={() => handleOpen(item)}
                      />
                    )}
                  </SwiperSlide>
                ));
              })()}
            </Swiper>
          )}
        </div>
        <div className="bg-dark_2 p-6 rounded-r-3xl w-1/2">
          {/* Header */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                }}
                src={postData?.user?.picture}
              />
              <div>
                <p className="text-white text-[18px] font-bold">{postData?.user?.name}</p>
                <p className="text-light_3">
                  {dayjs(postData?.created_date_unix_timestamp).format("DD MMMM [at] hh:mm A")}
                </p>
              </div>
            </div>
            {postData?.user?.id === user?.id && (
              <div className="flex gap-2">
                <Image
                  src={EditIcon}
                  alt="icon"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
                <Image
                  src={TrashBin2}
                  alt="icon"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() => setConfirmOpen(true)}
                />
              </div>
            )}
          </div>
          <p className="text-[16px] mt-5">{postData?.body}</p>
          <div className="h-[1px] w-full bg-dark_4 my-5"></div>
          {/* comment list */}
          <InfiniteScroll
            dataLength={comments.length}
            next={fetchNextCommentPage}
            hasMore={!!hasNextCommentPage}
            loader={<p className="text-center">Loading...</p>}
            endMessage={<p className="text-center mt-4">You have seen it all!</p>}
          >
            <div className="flex flex-col gap-3">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
              ))}
            </div>
          </InfiniteScroll>

          <div className="flex items-center justify-between text-gray-500 mt-4">
            <span className="flex items-center space-x-2 gap-5">
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
                {postData?.totalComments}
              </span>
              {/* <span className="flex items-center gap-1"></span>
                      <Image src={shareIcon} alt="icon" /> {post.shares}
                    </span> */}
            </span>
            {/* <Image src={savePostIcon} alt="icon" /> */}
          </div>

          <div className="flex items-center gap-4 mt-3">
            <input
              type="text"
              placeholder="Write your comment..."
              className="w-full p-2 bg-gray-800 rounded-lg text-white"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="p-2 bg-blue-600 rounded-lg" onClick={handleCommentSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-dark_4 my-[60px]"></div>
      <h1>More Related Posts</h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<p className="text-center">Loading...</p>}
        endMessage={<p className="text-center mt-4">You have seen it all!</p>}
      >
        <div className="mt-3 flex gap-10 flex-wrap">
          {posts.map((post) => (
            <Image
              key={post.id}
              src={
                JSON.parse(JSON.parse(post?.media as string)).length > 0
                  ? JSON.parse(JSON.parse(post?.media as string))?.[0]
                  : JSON.parse(JSON.parse(post?.media as string)) || ""
              }
              alt={post.body}
              width={200}
              height={200}
              className="object-contain cursor-pointer"
              onClick={() =>
                router.push(`${ROUTER_WEB.POST_DETAIL}/${post.id}`)
              }
            />
          ))}
        </div>
      </InfiniteScroll>
      <Modal open={open} onClose={handleClose}>
        <div className="flex justify-center items-center h-full">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected"
              width={800}
              height={800}
              className="object-contain"
              onClick={handleClose}
            />
          )}
        </div>
      </Modal>
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-white mb-4">Are you sure you want to delete this post?</p>
          <div className="flex gap-4">
            <button className="p-2 bg-red-600 rounded-lg" onClick={handleDelete}>
              Yes
            </button>
            <button className="p-2 bg-gray-600 rounded-lg" onClick={() => setConfirmOpen(false)}>
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostDetail;
