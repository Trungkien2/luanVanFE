import { AddPosticon } from "@/app/assets";
import Image from "next/image";
import userApi from "@/api/user/user.api";
import { IUser } from "@/interface/user.interface";
import { AxiosResponse } from "axios";
import EditProfile from "../_components/EditProfile";
const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data: any = await userApi.findOne(id, {
    fields: ["$all"],
  });

  return (
    <div>
      <h1 className="title flex gap-4">
        <Image src={AddPosticon} alt="add post" />
        Edit Profile
      </h1>
      <EditProfile user={data} />
    </div>
  );
};

export default page;
