import { AddPosticon } from "@/app/assets";
import Image from "next/image";
import FormCreate from "./_components/FormCreate";
import TopPost from "./_components/TopPost";
const page = () => {
  return (
    <div>
      <h1 className="title flex gap-4">
        <Image src={AddPosticon} alt="add post" />
        Edit Profile
      </h1>
      <div className="flex h-dvh">
        
        <FormCreate />
        <TopPost />
      </div>
    </div>
  );
};

export default page;
