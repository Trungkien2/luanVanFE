import axiosClient from "@/config/axiosClient";
import { PostFollowResponse } from "@/interface/respone.interface";
import { APIGetParams } from "@/util/apiUlti";
import BaseAPI from "@/util/BaseAPi";
import { ROUTER_API } from "@/util/route";

class PostApi extends BaseAPI {
  public getPostFollow = async (params: APIGetParams): Promise<PostFollowResponse> =>
    axiosClient.get(this.getRouter() + "/by-follow", {
      params,
    });

    public unlike = async (post_id : string) =>
        axiosClient.delete(this.getRouter() + `/${post_id}`+  "/like");

    public getPostExolore = async (params: APIGetParams): Promise<PostFollowResponse> =>
      axiosClient.get(this.getRouter() + "/explore", {
        params,
      });

      public getPostReels = async (params: APIGetParams): Promise<PostFollowResponse> =>
        axiosClient.get(this.getRouter() + "/reels", {
          params,
        });
}

export default new PostApi(ROUTER_API.POST);
