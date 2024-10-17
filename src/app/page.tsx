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
      redirect('/');
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Các liên kết khác */}
      </footer>
    </div>
  );
}
