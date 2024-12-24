import BaseAPI from "@/util/BaseAPi";
import { ROUTER_API } from "@/util/route";

class favoriteApi extends BaseAPI {}

export default new favoriteApi(ROUTER_API.FAVORITE);
