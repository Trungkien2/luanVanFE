/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ibase } from "./base.interface";
import { IUser } from "./user.interface";

export enum PostType {
  NORMAL = 'NORMAL',
  REEL = 'REEL'
}
export interface IPost extends Ibase {
  user_id: string;
  body: string;
  media: string;
  status: PostType;
  user: IUser;
  like_count : number
  comment_count:number
  isLiked:any
  created_date_unix_timestamp : number
  totalLikes:number
  totalComments:number
  

}
