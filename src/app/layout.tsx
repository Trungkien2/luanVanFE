import { SnackbarProvider } from "@/context/SnackbarContext";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Snapgram",
  description: "Best social media platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <SnackbarProvider>
        {children}

        </SnackbarProvider>
      </body>
    </html>
  );
}
