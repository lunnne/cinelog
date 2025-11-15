// /auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import Google from 'next-auth/providers/google';
import Naver from 'next-auth/providers/naver';
import Kakao from 'next-auth/providers/kakao';
import { generateTemporaryEmail } from '@/lib/generateEmail';
import { generateUsername } from '@/lib/generateUsername';

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return user;
      },
    }),

    // ⭐ GOOGLE LOGIN
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Naver({
      clientId: process.env.AUTH_NAVER_ID!,
      clientSecret: process.env.AUTH_NAVER_SECRET!,
    }),
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
      authorization: {
        url: 'https://kauth.kakao.com/oauth/authorize',

        params: {
          response_type: 'code',
          scope: 'profile_nickname profile_image',
          client_id: process.env.AUTH_KAKAO_ID!,
          redirect_uri: 'http://localhost:3000/api/auth/callback/kakao',
        },
      },
      token: 'https://kauth.kakao.com/oauth/token',
      userinfo: {
        url: 'https://kapi.kakao.com/v2/user/me',
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        const provider = account?.provider;
        const providerAccountId = account?.providerAccountId;

        // ✨ 이메일이 없으면 임시 이메일 생성
        const email = user.email ?? generateTemporaryEmail(provider ?? '', providerAccountId ?? '');

        // ✨ 표시용 이름 (구글/네이버/카카오에서 제공)
        const name = user.name ?? '이름없음';

        // ✨ username (고유 식별자)
        const username = generateUsername(provider ?? '', providerAccountId ?? '');
        // 👉 예: google_12345678

        // 👉 기존 유저 확인
        let existingUser = await prisma.user.findUnique({
          where: { email },
        });

        // 👉 없으면 생성
        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email,
              username, // 필수 unique
              name, // optional
              profileImage: user.image ?? null,
              provider, // google/naver/kakao
              password: '', // 소셜 로그인은 비밀번호 없음
            },
          });
        }

        return true;
      }

      return true;
    },

    async session({ session, token }) {
      return session;
    },
  },
});
