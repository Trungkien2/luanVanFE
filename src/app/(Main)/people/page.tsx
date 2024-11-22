import { PeopleIcon } from "@/app/assets"
import UserCard from "@/components/TopCreator/UserCard"
import Image from "next/image"

const page = () => {
  return (
    <div className="pt-[48px] flex-1 px-[52px] overflow-y-auto scrollbar-none">
    <h1 className="text-[24px] font-bold flex gap-2"><Image src={PeopleIcon} alt="icon"/>All Users</h1>
    <div className="mt-[40px] flex flex-wrap gap-12">
      <UserCard width="30%"/>
      <UserCard width="30%"/>
      <UserCard width="30%"/>
      <UserCard width="30%"/>
      <UserCard width="30%"/>
      <UserCard width="30%"/>
     
    </div>

  </div>
  )
}

export default page