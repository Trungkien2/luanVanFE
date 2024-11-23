import { Ibase } from "./base.interface";
import { IPost } from "./post.interface";

export interface IUser extends Ibase {
  name: string;
  email: string;
  user_name: string
  password: string;
  gender?: "MALE" | "FEMALE";
  account_type?: "IN_APP" | "GOOGLE";
  bio?: string;
  picture?: string;
  posts?: IPost[];
}
