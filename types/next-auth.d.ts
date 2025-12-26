import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email: string;
      role: "admin" | "viewer";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name?: string | null;
    email: string;
    role: "admin" | "viewer";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "viewer";
    name?: string | null;
  }
}
