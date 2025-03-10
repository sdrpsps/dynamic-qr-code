import { authOptions } from "@/lib/auth";
import FileUploader from "@/components/upload/FileUploader";
import QRCodeGenerator from "@/components/upload/QRCodeGenerator";
import QRCodeList from "@/components/upload/QRCodeList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Upload() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex flex-col items-center justify-items-center flex-grow">
      <main className="w-full max-w-4xl px-4 space-y-8 py-8">
        {/* 上传 */}
        <FileUploader />

        {/* 生成二维码 */}
        <QRCodeGenerator />

        {/* 二维码列表 */}
        <QRCodeList />
      </main>
    </div>
  );
}
