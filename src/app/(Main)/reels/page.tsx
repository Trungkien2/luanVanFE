"use client";
import { Input } from "@/components/Common/Input";
import CardReel from "./_components/CardReel";
import ButtonGroupCustom from "./_components/ButtonGroup";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import postApi from "@/api/post/post.api";
import { PostFollowResponse } from "@/interface/respone.interface";
import { POST_BY_REEL } from "@/util/queryKey";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

const Page = () => {
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [searchQuery]);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, refetch } =
    useInfiniteQuery<PostFollowResponse>({
      queryKey: [POST_BY_REEL, selectedButton, debouncedSearchQuery],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await postApi.getPostReels({
          fields: ["$all"],
          limit: 10,
          page: pageParam as number,
          filterType: selectedButton ? selectedButton : undefined,
          name: debouncedSearchQuery ? debouncedSearchQuery : undefined,
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

  const reels = data?.pages.flatMap((page) => page?.rows) || [];

  return (
    <div className="bg-dark_1 text-white">
      <div className="flex flex-col items-center gap-3">
        <h1 className="title">Search Creators</h1>
        <div className="flex gap-1 px-4 lg:w-[657px] rounded-lg bg-dark_4">
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-[40px]">
        <ButtonGroupCustom onSelect={setSelectedButton} />
        {reels.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400 text-lg">No Data Available</p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={reels.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<h4>Loading...</h4>}
          >
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reels?.map((reel, index) => (
                <CardReel key={index} reel={reel} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Page;
