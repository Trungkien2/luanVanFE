"use client";
import { Grid2 } from "@mui/material";
import UserCard from "./UserCard";
import userApi, { UserResponse } from "@/api/user/user.api";
import { useQuery } from "@tanstack/react-query";
import { USER_NOT_FOLLOW } from "@/util/queryKey";

const Topcreator = () => {
  const { data, isLoading, isError, refetch } = useQuery<UserResponse>({
    queryKey: [USER_NOT_FOLLOW, { page: 1 }], // Định nghĩa query key (thêm page nếu cần)
    queryFn: async () => {
      console.log("Fetching page: 1");
      const response = await userApi.getUserNotFollow({
        fields: ["$all"],
        limit: 10, // Nếu không cần phân trang, giới hạn theo nhu cầu
        page: 1, // Trang mặc định là 1
      });
      console.log("API Response:", response);
      return response;
    },
  
  });

  const handleRefetchUsers = () => {
    refetch(); 
  };

  return (
    <div className="w-[465px] px-[12px] py-[48px] pb-3 bg-dark_2  h-screen sticky overflow-hidden top-0">
      <h2 className="font-bold text-[24px] mb-[40px]">Top Creators</h2>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data?.usersNotFollowed.map((item, index) => (
          <Grid2 key={index} sx={{ width: "190px" }}>
            <UserCard user={item} onFollowSuccess={handleRefetchUsers}  />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Topcreator;
