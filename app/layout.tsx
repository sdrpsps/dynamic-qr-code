import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "@/components/session/NextAuthProvider";
import Navbar from "@/components/Navbar";
import GitHubCorner from "@/components/GitHubCorner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "动态二维码生成工具 - 轻松管理您的二维码",
  description:
    "专业的动态二维码生成与管理平台，支持二维码生成、实时更新管理。助力企业高效开展营销活动与用户互动。",
  keywords: "动态二维码,二维码生成器,活码生成,二维码管理,营销工具",
  robots: "index, follow",
  openGraph: {
    title: "动态二维码生成工具 - 轻松管理您的二维码",
    description: "专业的动态二维码生成与管理平台，支持二维码生成、实时更新管理",
    type: "website",
    locale: "zh_CN",
    images: ["https://y.gtimg.cn/music/photo_new/T053M000004Amlfr4OcARI.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head />
      <body className="min-h-screen antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <Navbar />
            {children}
          </NextAuthProvider>
          <GitHubCorner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
