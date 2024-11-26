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
  media: any[];
  status: PostType;
  user: IUser;
}
