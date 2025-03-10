import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <main className="w-full max-w-4xl flex justify-center items-center">
        <Link href="/upload">
          <Button className="bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-100">
            <ArrowRightIcon />
            开始使用
          </Button>
        </Link>
      </main>
    </div>
  );
}
