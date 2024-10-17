import axiosClient from "@/config/axiosClient";
import BaseAPI from "@/util/BaseAPi";
import { ROUTER_API } from "@/util/route";

class AuthApi extends BaseAPI {
  async signUp(body: { name: string; email: string; password: string }) {
    return await axiosClient.post(this.getRouter() + "/sign-up", body);
  }

  async login(body: { email: string; password: string }) {
    return await axiosClient.post(this.getRouter() + "/login", body);
  }
}

export default new AuthApi(ROUTER_API.AUTH);
