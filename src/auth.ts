// /auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

// ✅ Provider Imports
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Naver from 'next-auth/providers/naver';
import Kakao from 'next-auth/providers/kakao';

import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  // ✅ OAuth Providers (AUTH_* 환경 변수 자동 인식됨)
  providers: [
    Google,
    Naver,
    Kakao,

    // ✅ Custom Email/Password 로그인 (Credentials)
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password as string, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],

  // ✅ JWT 세션 전략
  session: { strategy: 'jwt' },

  // ✅ JWT & Session 콜백
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id as string;
      return session;
    },
  },

  // ✅ 보안 설정
  secret: process.env.AUTH_SECRET,

  // ✅ 로그인 페이지 (커스텀)
  pages: {
    signIn: '/auth/signin',
  },
});
