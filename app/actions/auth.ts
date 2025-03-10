"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";

export async function createUser(username: string, password: string) {
  const hashedPassword = await hash(password, 10);

  try {
    const result = await db
      .insert(users)
      .values({
        username,
        password: hashedPassword,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("用户创建失败", error);
    throw new Error("用户创建失败");
  }
}

export async function verifyUser(username: string, password: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!user) {
    return null;
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    return null;
  }

  return user;
}

export async function signOut() {
  await signOut();
}

export async function updateUserPassword(
  oldPassword: string,
  newPassword: string
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("用户未登录");
  }

  // 先验证旧密码
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!user) {
    throw new Error("用户不存在");
  }

  const isValid = await compare(oldPassword, user.password);
  if (!isValid) {
    throw new Error("旧密码错误");
  }

  // 更新新密码
  const hashedPassword = await hash(newPassword, 10);
  await db
    .update(users)
    .set({
      password: hashedPassword,
    })
    .where(eq(users.id, user.id));

  return { message: "密码更新成功" };
}
