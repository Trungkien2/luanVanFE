import React from "react";
import PostDetail from "./_components/PostDetail";


const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <PostDetail postId={params.id} />
    </div>
  );
};

export default page;
