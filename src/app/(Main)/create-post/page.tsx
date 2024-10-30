import { AddPosticon } from "@/app/assets";
import Image from "next/image";
import FormCreate from "./_components/FormCreate";
const page = () => {
  return (
    <div>
      <h1 className="title flex gap-4">
        <Image src={AddPosticon} alt="add post" />
        Create a Post
      </h1>
      <FormCreate />
    </div>
  );
};

export default page;
