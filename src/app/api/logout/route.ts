// app/api/logout/route.ts (Next.js 13+ App Router)
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Xóa cookie `access_token`
  response.cookies.set("access_token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), 
  });

  return response;
}
