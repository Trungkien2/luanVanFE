import axiosClient from "@/config/axiosClient";
import { IPagination } from "@/interface/base.interface";
import { IUser } from "@/interface/user.interface";
import { APIGetParams } from "@/util/apiUlti";
import BaseAPI from "@/util/BaseAPi";
import { ROUTER_API } from "@/util/route";
export interface UserResponse {
  usersNotFollowed: IUser[]; 
  pagination : IPagination
}

export interface IUserDetailRes {
  user: IUser;
  totalPosts: number;
  totalFollowers: number;
  totalFollowings: number;
}
class UserApi extends BaseAPI {
  public getUserNotFollow = async (params: APIGetParams): Promise<UserResponse> =>
    axiosClient.get(this.getRouter() + "/un-follow", {
      params,
    });
    public getUserDetail = async (id: string): Promise<IUserDetailRes> =>
      axiosClient.get(this.getRouter() + "/"+ id+"/details", );
}

export default new UserApi(ROUTER_API.USER);
