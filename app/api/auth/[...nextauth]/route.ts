import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        /* 🔑 ADMIN ACCOUNTS */
        if (
          (credentials.email === "admin@admybrand.com" ||
            credentials.email === "admin@demo.com") &&
          credentials.password === "admin123"
        ) {
          return {
            id: "admin-1",
            name: "Admin",
            email: credentials.email,
            role: "admin",
          };
        }

        /* 👤 VIEWER ACCOUNT (Demo) */
        if (
          credentials.email === "viewer@demo.com" &&
          credentials.password === "viewer123"
        ) {
          return {
            id: "viewer-1",
            name: "Viewer User",
            email: credentials.email,
            role: "viewer",
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.name = (user as any).name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "admin" | "viewer";
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
