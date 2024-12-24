import { IPagination } from "./base.interface";
import { IPost } from "./post.interface";

export interface PostFollowResponse {
    count : number;
    rows: IPost[]; 
    pagination : IPagination
  }

export interface IRespone<T> {
  count : number;
  rows: T[];
  pagination : IPagination
}