import BaseAPI from "@/util/BaseAPi";
import { ROUTER_API } from "@/util/route";

class PostApi extends BaseAPI {}

export default new PostApi(ROUTER_API.POST);
