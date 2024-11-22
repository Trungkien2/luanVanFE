// components/CardPost.js
import { Avatar } from "@mui/material";
import Image from "next/image";

const CardPost = ({ post }: any) => {
  return (
    <div className="bg-dark_2 text-white py-[36px] px-[29px] rounded-xl  border-dark_4 mb-[40px]">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar />
        <div>
          <h2 className="text-lg font-semibold">{post.userName}</h2>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </div>
      <p className="mb-4 text-gray-300">{post.content}</p>
      <Image
        src={post.image}
        alt="Post image"
        width={600}
        height={300}
        className="rounded-lg mb-4 w-full"
      />
      <div className="flex items-center justify-between text-gray-500 mb-2">
        <span className="flex items-center space-x-2">
          <span>❤️ {post.likes}</span>
          <span>💬 {post.comments}</span>
          <span>🔄 {post.shares}</span>
        </span>
      </div>
      <input
        type="text"
        placeholder="Write your comment..."
        className="bg-dark_3 text-white p-2 w-full rounded-md mt-2 focus:outline-none"
      />
    </div>
  );
};

export default CardPost;
