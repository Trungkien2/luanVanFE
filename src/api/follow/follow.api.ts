import axiosClient from "@/config/axiosClient";
import BaseAPI from "@/util/BaseAPi";
import { ROUTER_API } from "@/util/route";

class followApi extends BaseAPI {
    async unfollow(followedId: string) {
        return await axiosClient.delete(this.getRouter() + `/${followedId}`);
      }
      async accept(following: string) {
        return await axiosClient.post(this.getRouter() + `/accept/${following}`);
      }
      async deny(following: string) {
        return await axiosClient.post(this.getRouter() + `/deny/${following}`);
      }

}

export default new followApi(ROUTER_API.FOLLOW);
