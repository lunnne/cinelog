// src/auth.config.ts
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  }
} satisfies NextAuthConfig


