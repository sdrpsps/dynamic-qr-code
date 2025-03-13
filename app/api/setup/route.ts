import { createUser } from "@/app/actions/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const DEFAULT_USER = {
  username: process.env.USER_USERNAME || "admin",
  password: process.env.USER_PASSWORD || "password123",
};

export async function GET() {
  try {
    // 检查是否已存在默认用户
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, DEFAULT_USER.username),
    });

    if (!existingUser) {
      // 创建默认用户
      await createUser(DEFAULT_USER.username, DEFAULT_USER.password);
      console.log(
        `默认用户创建成功: ${DEFAULT_USER.username}, ${DEFAULT_USER.password}`
      );
    } else {
      console.log(`默认用户已存在: ${DEFAULT_USER.username}`);
    }

    return NextResponse.json({ message: "操作成功" }, { status: 200 });
  } catch (error) {
    console.error("初始化数据库失败:", error);
    return NextResponse.json({ error: "服务器错误" }, { status: 500 });
  }
}
