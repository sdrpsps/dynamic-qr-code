"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import UpdatePasswordDialog from "./UpdatePasswordDialog";

export default function Navbar() {
  const { status } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-background">
      <div className="text-2xl font-bold text-blue-500 dark:text-blue-200 select-none">
        <Link href="/">动态二维码生成工具</Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {status === "authenticated" ? (
          <>
            <UpdatePasswordDialog />
            <Button onClick={() => signOut()}>
              <LogOutIcon />
              退出
            </Button>
          </>
        ) : (
          <Link href="/auth/signin">
            <Button>
              <LogInIcon />
              登录
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
