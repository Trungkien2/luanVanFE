import { Input } from "@/components/Common/Input";
import CardPost from "../explore/_components/CardPost";
import ButtonGroupCustom from "./_components/ButtonGroup";

const page = () => {
  return (
    <div>
      <div className="flex">
        <h1 className="title">Saved Reels</h1>
      </div>
      <div className="mt-[40px]">
        <ButtonGroupCustom />
        <div className="mt-3 flex gap-10 flex-wrap">
          {/* {Array.from({ length: 10 }, (_, index) => index + 1).map((item) => (
            <CardPost />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default page;
