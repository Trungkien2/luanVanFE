import { Ibase } from "./base.interface";
import { IUser } from "./user.interface";

export interface IUserSetting extends Ibase {
  user_id: number;
  privacy_level?: string;
  notification_push?: boolean;
  is_account_private?: boolean;
  show_activity_status?: boolean;
  user?: IUser;
}
