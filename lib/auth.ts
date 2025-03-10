import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUser } from "../app/actions/auth";

// 扩展 Session 类型
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
    };
  }
  interface User {
    id: number;
    username: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("请输入用户名和密码");
          }

          const user = await verifyUser(
            credentials.username,
            credentials.password
          );

          if (!user) {
            throw new Error("用户名或密码错误");
          }

          return {
            id: user.id,
            username: user.username,
          };
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "认证失败");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // 首次登录，将用户信息存入token
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
    async session({ session, token }) {
      // 将token中的用户信息传递给session
      session.user = {
        id: token.id as number,
        username: token.username as string,
      };
      return session;
    },
  },
};
