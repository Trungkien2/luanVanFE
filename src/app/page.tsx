import HomePage from "@/components/HomePage";
import Sidebar from "@/components/Sidebar/Sidebar";
import Topcreator from "@/components/TopCreator/Topcreator";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { use } from "react";

interface SearchParams {
  user?: string;
}

interface User {
  message: {
    en: string;
  };
  access_token: string;
}

async function saveToken(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });
  return res.ok;
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  // Lấy access_token từ searchParams
  const accessToken: string | null = searchParams.user
    ? JSON.parse(decodeURIComponent(searchParams.user))?.access_token
    : null;

  // Nếu có access_token, lưu nó và sau đó xóa query params
  if (accessToken) {
    const saved = use(saveToken(accessToken as string));
    if (saved) {
      // Xóa query params bằng cách redirect về chính trang mà không có params
      redirect("/");
    }
  }

  return (
    <div className="flex justify-between h-screen">
      <Sidebar />
      <HomePage />
      <Topcreator />
    </div>
  );
}
