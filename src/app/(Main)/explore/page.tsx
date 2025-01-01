"use client";
import { Input } from "@/components/Common/Input";
import CardPost from "./_components/CardPost";
import { ImageList, ImageListItem } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component"; // Import thư viện
import { PostFollowResponse } from "@/interface/respone.interface";
import { POST_BY_EXPLORE } from "@/util/queryKey";
import postApi from "@/api/post/post.api";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { ROUTER_WEB } from "@/util/route";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Page = () => {
  const router = useRouter();
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

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        {/* <h1 className="title">Search Hashtags</h1>
        <div className="flex gap-1 px-4 lg:w-[657px] rounded-lg bg-dark_4">
          <Input type="text" placeholder="Search" className="explore-search" />
        </div> */}
      </div>
      <div className="mt-[40px]">
        <h1 className="title mb-6">Popular Today</h1>
        <InfiniteScroll
          dataLength={posts.length} // Số lượng phần tử hiện tại
          next={fetchNextPage} // Hàm gọi API để lấy thêm dữ liệu
          hasMore={!!hasNextPage} // Kiểm tra xem còn dữ liệu không
          loader={<p className="text-center">Loading...</p>} // Hiển thị khi đang tải
          endMessage={<p className="text-center mt-4">You have seen it all!</p>} // Hiển thị khi hết dữ liệu
        >
          <ImageList
            variant="quilted"
            cols={4}
            rowHeight={121}
            sx={{
              width: "100%",
            }}
          >
            {posts.map((item) => (
              <ImageListItem key={item.id} cols={1} rows={1}>
                <img
                  {...srcset(
                    JSON.parse(JSON.parse(item?.media as string)).length > 0
                      ? JSON.parse(JSON.parse(item?.media as string))?.[0]
                      : JSON.parse(JSON.parse(item?.media as string)) || "",
                    121,
                    1,
                    1
                  )}
                  alt={item.body}
                  loading="lazy"
                  className="object-contain cursor-pointer"
                  onClick={()=> router.push(`${ROUTER_WEB.POST_DETAIL}/${item.id}`)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </InfiniteScroll>
        <Modal open={open} onClose={handleClose}>
          <div className="flex justify-center items-center h-full">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="object-contain"
                style={{ maxHeight: "90%", maxWidth: "90%" }}
                onClick={handleClose}
              />
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Page;
