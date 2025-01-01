import { Ibase } from "./base.interface";
import { IUser } from "./user.interface";


export interface IComment  extends Ibase {
user_id : number;
user :IUser
post_id : string;
content : string;
created_date_unix_timestamp: number
}