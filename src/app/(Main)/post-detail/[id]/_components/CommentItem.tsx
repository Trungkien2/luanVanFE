import { IComment } from '@/interface/comment.interface'
import { Avatar } from '@mui/material'
import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface IProps {
  comment: IComment
  onReply: (username: string) => void
}

const CommentItem: React.FC<IProps> = ({ comment, onReply }) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar
        sx={{
          width: 36,
          height: 36,
        }}
        src={comment?.user?.picture}
      />
      <div>
        <div className="flex gap-2 items-center">
          <p className="text-[18px] font-bold text-light_3">{comment?.user?.name}</p>
          <p className="text-[12px]">{comment?.content}</p>
        </div>
        <div className="flex gap-2 mt-2">
          <p className="text-[14px] font-bold text-light_3">
            {dayjs(comment?.created_date_unix_timestamp).fromNow()}
          </p>
          <p className="text-[12px] cursor-pointer" onClick={() => onReply(comment?.user?.name)}> Reply</p>
        </div>
      </div>
    </div>
  )
}

export default CommentItem