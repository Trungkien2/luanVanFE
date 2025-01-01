"use client";
import { EditIcon } from "@/app/assets";
import { IPost } from "@/interface/post.interface";
import { IRespone } from "@/interface/respone.interface";
import useUserStore from "@/store/userStore";
import { POST_BY_SELF } from "@/util/queryKey";
import { ROUTER_WEB } from "@/util/route";
import { Avatar } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import CardPost from "../../explore/_components/CardPost";
import ButtonGroupCustom from "./ButtonGroup";
import UserApi, { IUserDetailRes } from "@/api/user/user.api";
import postApi from "@/api/post/post.api";
import { useSnackbar } from "@/context/SnackbarContext";
import followApi from "@/api/follow/follow.api";
import { set } from "lodash";

interface IProps {
  isOtherProfile?: boolean;
  userId?: string;
}

const UserProfile: React.FC<IProps> = ({ isOtherProfile = false, userId }) => {
  const { user } = useUserStore();
  const [userData, setUserData] = useState<IUserDetailRes | null>(null);
  const [selectedButton, setSelectedButton] = useState<string>("POST");
  const [isFollow, setisFollow] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequestReceived, setIsRequestReceived] = useState(false);
  const [totalPosts, setTotalPosts] = useState<number | null>(null);

  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const fetchUserData = async () => {
    const id = isOtherProfile && userId ? userId : user?.id;
    if (id) {
      const data = await UserApi.getUserDetail(id);
      setUserData(data);
      setTotalPosts(data.totalPosts);
      setisFollow(!!data.user?.isFollow);
      setIsRequestSent(!!data.user?.isRequestSent);
      setIsRequestReceived(!!data.user?.isRequestReceived);
    }
  };
  const handleFollow = async () => {
    try {
      if (isFollow) {
        await followApi.unfollow(userData?.user?.id as string);
        showSnackbar("Unfollow success", "success");
      } else {
        await followApi.create({
          following_user_id: user?.id,
          followed_user_id: userData?.user?.id,
        });
        showSnackbar("Follow success", "success");
      }
      fetchUserData();
    } catch (error: any) {
      console.log("🚀 ~ handleFollow ~ error:", error);
      showSnackbar("Follow/Unfollow error", "error");
    }
  };
  const handleUnfollow = async (id: string) => {
    try {
      await followApi.unfollow(id);
      showSnackbar("Unfollow success", "success");
      fetchUserData();
    } catch (error) {
      console.log("🚀 ~ handleFollow ~ error:", error);
      showSnackbar("Follow/Unfollow error", "error");
    }
  };
  const handleAccept = async () => {
    try {
      await followApi.accept(userData?.user?.id as string);
      showSnackbar("accept success", "success");
      fetchUserData();
    } catch (error) {
      console.log("🚀 ~ handleFollow ~ error:", error);
      showSnackbar("Follow/Unfollow error", "error");
    }
  };

  const handleDeny = async () => {
    try {
      await followApi.deny(userData?.user?.id as string);
      showSnackbar("deny success", "success");
      fetchUserData();
    } catch (error) {
      console.log("🚀 ~ handleFollow ~ error:", error);
      showSnackbar("Follow/Unfollow error", "error");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isOtherProfile, userId, user]);

  const { data } = useInfiniteQuery<IRespone<IPost>>({
    queryKey: [POST_BY_SELF, selectedButton],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await postApi.getList<IRespone<IPost>>({
        fields: ["$all"],
        limit: 10,
        page: pageParam as number,
        where: {
          user_id: isOtherProfile ? userData?.user?.id : user?.id,
          status: selectedButton,
        },
      });
      return response;
    },
    enabled: !!userData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination) return undefined;
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const posts = data?.pages.flatMap((page) => page?.rows) || [];
  const router = useRouter();

  if (!userData) {
    return <div>Loading...</div>;
  }

  const checkRendertButtonRequest = () => {
    if (!isRequestSent && !isRequestReceived) {
      return (
        <>
          <div
            className="px-[20px] py-[10px] bg-primary text-white rounded-lg flex justify-center items-center cursor-pointer"
            onClick={handleFollow}
          >
            {isFollow ? "UnFollow" : "Follow"}
          </div>
          {isFollow &&  <div className="px-[20px] py-[10px] bg-white text-black rounded-lg flex justify-center items-center cursor-pointer">
            Message
          </div>}
         
        </>
      );
    }
    if (isRequestSent) {
      return (
        <div
          className="px-[20px] py-[10px] bg-primary text-white rounded-lg flex justify-center items-center cursor-pointer"
          onClick={() => handleUnfollow(userData?.user?.id as string)}
        >
          Request Sent
        </div>
      );
    }
    if (isRequestReceived) {
      return (
        <>
          <div
            className="px-[20px] py-[10px] bg-primary text-white rounded-lg flex justify-center items-center cursor-pointer"
            onClick={handleAccept}
          >
            Request Accept
          </div>
          <div
            className="px-[20px] py-[10px] bg-red-500 text-white rounded-lg flex justify-center items-center cursor-pointer"
            onClick={() => handleDeny()}
          >
            Deny
          </div>
        </>
      );
    }
  };

  return (
    <div className="mt-5">
      <div className="flex gap-7">
        <Avatar className="w-[150px] h-[150px]" src={userData?.user?.picture}>
          K
        </Avatar>

        <div>
          <div className="flex gap-8">
            <h1 className="text-[36px] font-semibold">
              {userData?.user?.name}
            </h1>
            {isOtherProfile ? (
              <div className="flex gap-3">{checkRendertButtonRequest()}</div>
            ) : (
              <div className="flex gap-1 item text-[14px] rounded-xl bg-dark_3 px-[20px] py-[10px] hover:opacity-50 cursor-pointer">
                <Image src={EditIcon} alt="icon" width={16} height={16} />{" "}
                <p
                  className="leading-[30px]"
                  onClick={() =>
                    router.push(`${ROUTER_WEB.EDIT_PROFILE}/${user?.id}`)
                  }
                >
                  Edit profile
                </p>
              </div>
            )}
          </div>
          <p className="text-[18px] text-light_3">
            {userData?.user?.user_name}
          </p>
          <div className="flex items-center gap-10 mt-3 mb-3">
            <div className="text-[18px] ">
              <p className="text-primary">{userData?.totalPosts}</p>
              <p>Posts</p>
            </div>
            <div className="text-[18px]">
              <p className="text-primary">{userData?.totalFollowers}</p>{" "}
              Followers
            </div>
            <div className="text-[18px]">
              <p className="text-primary">{userData?.totalFollowings}</p>{" "}
              <p>Following</p>
            </div>
          </div>

          <p className="text-[18px]">{userData?.user?.bio}</p>
          {/* <StoryList /> */}
        </div>
      </div>
      <div className="mt-[68px]">
        <ButtonGroupCustom onSelect={setSelectedButton} />
      </div>
      <div>
        {totalPosts === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No data available
          </div>
        ) : (
          <div className="mt-3 flex gap-10 flex-wrap">
            {posts.map((post) => (
              <CardPost
                key={post.id}
                image={JSON.parse(JSON.parse(post?.media))?.[0]}
              />
            ))}
          </div>
        )}
      </div>
      <SnackbarComponent />
    </div>
  );
};

export default UserProfile;
