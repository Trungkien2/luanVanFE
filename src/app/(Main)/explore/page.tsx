import { Input } from "@/components/Common/Input";
import CardPost from "./_components/CardPost";

const page = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <h1 className="title">Search Hashtags</h1>
        <div className="flex gap-1 px-4 lg:w-[657px] rounded-lg bg-dark_4">
          <Input type="text" placeholder="Search" className="explore-search" />
        </div>
      </div>
      <div className="mt-[40px]">
        <h1 className="title">Popular Today</h1>
        <div className="mt-3 flex gap-10 flex-wrap">
          {Array.from({length :10},(_,index)=> index +1).map(item=><CardPost/>)}
        </div>
      </div>
    </div>
  );
};

export default page;
