import { Grid2 } from "@mui/material";
import UserCard from "./UserCard";

const Topcreator = () => {
  return (
    <div className="w-[465px] px-[12px] py-[48px] pb-3 bg-dark_2">
      <h2 className="font-bold text-[24px] mb-[40px]">Top Creators</h2>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(8)).map((_, index) => (
          <Grid2 key={index} sx={{width : '190px'}}>
            <UserCard />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Topcreator;
