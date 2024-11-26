import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const response = NextResponse.json({ message: "Logged in successfully" });
  console.log(
    "🚀 ~ file: route.ts ~ line 7 ~ POST ~ message",
    "Logged in successfull",
    token
  );
  response.cookies.set("access_token", token, {
    httpOnly: false,
    path: "/",
    secure: process.env.NODE_ENV === "production", // Ensure Secure only in production
    sameSite: "lax",
  });

  return response;
}
