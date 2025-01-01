"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import CardPost from "./CardPost/CardPost";

import { MainPost } from "@/app/assets";
import { PostFollowResponse } from "@/interface/respone.interface";
import postApi from "@/api/post/post.api";
import { POST_BY_FOLLOW } from "@/util/queryKey";
import InfiniteScroll from "react-infinite-scroll-component";


const HomePage = () => {

  const { data, fetchNextPage, hasNextPage, isLoading, isError,refetch } =
    useInfiniteQuery<PostFollowResponse>({
      queryKey: [POST_BY_FOLLOW],
      queryFn: async ({ pageParam = 1 }) => {
        console.log("Fetching page:", pageParam);
        const response = await postApi.getPostFollow({
          fields: ["$all"],
          limit: 10,
          page: pageParam as number,
        });
        console.log("API Response:", response);
        return response;
      },
      
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        console.log("Last page data:", lastPage);
        if (!lastPage?.pagination) return undefined;

        const { currentPage, totalPages } = lastPage.pagination;
        console.log(`Current Page: ${currentPage}, Total Pages: ${totalPages}`);

        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

    const posts = data?.pages.flatMap((page) => page?.rows) || [];

  return (
    <div className="pt-[48px] flex-1 px-[52px] overflow-y-auto scrollbar-none">
     
      <h1 className="text-[24px] font-bold">Home Feed</h1>
      <div className="mt-[40px]">
      {isLoading && <p>Loading post...</p>}
      {isError && <p>Something went wrong! Please try again later.</p>}

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollableTarget="scroll-container"
        loader={<p>Loading more users...</p>}
       
        endMessage={
          <p className="w-full text-center">All post have been loaded!</p>
        }
      >
        {posts.map((post) => (
           <CardPost post={post} />
          ))}
      </InfiniteScroll>
       
      </div>
  
    </div>
  );
};

export default HomePage;
