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
class UserApi extends BaseAPI {
  public getUserNotFollow = async (params: APIGetParams): Promise<UserResponse> =>
    axiosClient.get(this.getRouter() + "/un-follow", {
      params,
    });
}

export default new UserApi(ROUTER_API.USER);
