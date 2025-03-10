import { createPresignedPutUrl, getObjectUrl, getPrefixUrl } from "@/lib/s3";
import { generateFilePath } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { filename, contentType } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: "缺少必要参数" }, { status: 400 });
    }

    // 生成唯一的文件名
    const key = getPrefixUrl(generateFilePath(filename));

    // 获取预签名上传URL
    const uploadUrl = await createPresignedPutUrl(key);

    return NextResponse.json({
      uploadUrl,
      key,
      fileUrl: getObjectUrl(key),
    });
  } catch (error) {
    console.error("获取上传凭证失败:", error);
    return NextResponse.json({ error: "获取上传凭证失败" }, { status: 500 });
  }
}
