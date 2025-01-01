import BaseAPI from "@/util/BaseAPi";
import { ROUTER_API } from "@/util/route";

class commentApi extends BaseAPI {}

export default new commentApi(ROUTER_API.COMMENT);
