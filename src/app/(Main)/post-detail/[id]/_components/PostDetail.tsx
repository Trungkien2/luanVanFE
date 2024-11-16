import Image from "next/image";
import { HeartIcon, ChatIcon, BookmarkIcon } from "@heroicons/react/outline";
import { ExploreCardPost } from "@/app/assets";
import { Avatar } from "@mui/material";

const PostDetail = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <Image
          src={ExploreCardPost}
          alt="Post Image"
          width={500}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Post Content */}
      <div className="w-full md:w-1/2">
        <div className="flex items-center gap-4 mb-4">
          <Avatar />
          <div>
            <h3 className="text-lg font-semibold">Lewis Hamilton</h3>
            <p className="text-sm text-gray-400">26 June at 09:32 PM</p>
          </div>
        </div>
        <p className="mb-4">
          Exploring the wild life!{" "}
          <span className="text-blue-500">#nature #wildlife</span>
        </p>
        <div className="flex gap-6 mb-4">
          <div className="flex items-center gap-1">
            <HeartIcon className="w-5 h-5 text-red-500" />
            <span>120</span>
          </div>
          <div className="flex items-center gap-1">
            <ChatIcon className="w-5 h-5 text-blue-500" />
            <span>68</span>
          </div>
          <div className="flex items-center gap-1">
            <BookmarkIcon className="w-5 h-5 text-yellow-500" />
            <span>74</span>
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Write your comment..."
            className="w-full p-2 bg-gray-800 rounded-lg text-white"
          />
          <button className="p-2 bg-blue-600 rounded-lg">Send</button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
