import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTER_WEB } from "./util/route";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value;

    if (req.nextUrl.pathname === ROUTER_WEB.HOME_PAGE) {
        if (!token) {
            return NextResponse.redirect(
                new URL( ROUTER_WEB.LOGIN, req.url),
              );
        }
      }
      if (req.nextUrl.pathname === ROUTER_WEB.LOGIN && token) {
        return NextResponse.redirect(
          new URL( ROUTER_WEB.HOME_PAGE, req.url),
        );
      }
}
