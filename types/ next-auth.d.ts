// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  // 2.a) Extend the built‑in User with your extra props
  interface User extends DefaultUser {
    // NextAuth’s `id` is always a string
    id: string;
    jwtToken: string;
    orgId: number;
    role: string;
    menu: unknown[];
  }

  // 2.b) Make Session.user use that same User type
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  // 2.c) Your JWT callback will now get/return these fields
  interface JWT {
    id: string;
    accessToken: string;
    orgId: number;
    role: string;
    menu: unknown[];
  }
}
