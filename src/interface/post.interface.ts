import { Ibase } from "./base.interface";

export interface IPost extends Ibase {
  name: string;
  email: string;
  password: string;
  gender?: "MALE" | "FEMALE";
  account_type?: "IN_APP" | "GOOGLE";
  bio?: string;
  picture?: string;
}
