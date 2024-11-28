import axiosClient from "@/config/axiosClient";
import BaseAPI from "@/util/BaseAPi";
import { ROUTER_API } from "@/util/route";
const headers = { "Content-Type": "multipart/form-data" }
class UploadApi extends BaseAPI {
    async uploadImage(body: any) {
        return await axiosClient.post(this.getRouter() + "/image", body,{headers});
      }
      async uploadImages(body: any) {
        return await axiosClient.post(this.getRouter() + "/images", body,{headers});
      }
}

export default new UploadApi(ROUTER_API.UPLOAD);
