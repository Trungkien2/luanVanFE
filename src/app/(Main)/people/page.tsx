"use client";
import userApi, { UserResponse } from "@/api/user/user.api";
import { PeopleIcon } from "@/app/assets";
import UserCard from "@/components/TopCreator/UserCard";
import { IUser } from "@/interface/user.interface";
import { USER_NOT_FOLLOW } from "@/util/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component"; 

const Page = () => {
  const LIMIT = 10;

  const { data, fetchNextPage, hasNextPage, isLoading, isError,refetch } =
    useInfiniteQuery<UserResponse>({
      queryKey: [USER_NOT_FOLLOW],
      queryFn: async ({ pageParam = 1 }) => {
        console.log("Fetching page:", pageParam);
        const response = await userApi.getUserNotFollow({
          fields: ["$all"],
          limit: LIMIT,
          page: pageParam as number,
        });
        console.log("API Response:", response);
        return response;
      },
      staleTime: 1000 * 60 * 5,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        console.log("Last page data:", lastPage);
        if (!lastPage?.pagination) return undefined;

        const { currentPage, totalPages } = lastPage.pagination;
        console.log(`Current Page: ${currentPage}, Total Pages: ${totalPages}`);

        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  const users = data?.pages.flatMap((page) => page?.usersNotFollowed) || [];

  const handleRefetchUsers = () => {
    refetch(); 
  };
  return (
    <div className="pt-[48px] flex-1 px-[52px] overflow-y-auto scrollbar-none">
      <h1 className="text-[24px] font-bold flex gap-2">
        <Image src={PeopleIcon} alt="icon" />
        All Users
      </h1>

      {isLoading && <p>Loading users...</p>}
      {isError && <p>Something went wrong! Please try again later.</p>}

    <div className=" scroll-container h-[calc(100vh-200px)] overflow-y-auto" id="scroll-container">
    <InfiniteScroll
        dataLength={users.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollableTarget="scroll-container"
        loader={<p>Loading more users...</p>}
       
        endMessage={
          <p className="w-full text-center">All users have been loaded!</p>
        }
      >
        <div className="mt-[40px] flex flex-wrap gap-12">
          {users.map((user: IUser) => (
            <UserCard key={user.id} user={user} width="30%"   onFollowSuccess={handleRefetchUsers} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
    </div>
  );
};

export default Page;
