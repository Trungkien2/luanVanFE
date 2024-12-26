import { IPost } from "@/interface/post.interface";
import React from "react";
import { Avatar, Typography } from "@mui/material";

interface CardReelProps {
  reel: IPost;
}

const CardReel: React.FC<CardReelProps> = ({ reel }) => {
  const mediaParse: string = JSON.parse(JSON.parse(reel?.media as string));

  return (
    <div className="w-full max-w-xs bg-dark_3 rounded-lg overflow-hidden shadow-lg">
      {reel.media && reel.media.length > 0 && (
        <video
          className="w-full h-64"
          src={mediaParse}
          autoPlay
          muted
          loop
          poster={"https://via.placeholder.com/150"}
        />
      )}
      <div className="p-4">
        <div className="flex items-center mb-2">
          <Avatar src={reel.user.picture} alt={reel.user.name} />
          <Typography variant="subtitle1" className="ml-2 text-white">
            {reel.user.name}
          </Typography>
        </div>
        <p className="text-gray-400">{reel?.body}</p>
      </div>
    </div>
  );
};

export default CardReel;