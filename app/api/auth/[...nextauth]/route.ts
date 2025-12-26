import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        viewerUsers: { label: "Viewer Users", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        /* 🔑 ADMIN */
        if (
          credentials.email === "admin@admybrand.com" &&
          credentials.password === "admin123"
        ) {
          return {
            id: "admin-1",
            name: "Admin",
            email: credentials.email,
            role: "admin",
          };
        }

        /* 👤 VIEWER (Signup users) */
        if (credentials.viewerUsers) {
          try {
            const users = JSON.parse(credentials.viewerUsers);

            const match = users.find(
              (u: any) =>
                u.email === credentials.email &&
                u.password === credentials.password
            );

            if (match) {
              return {
                id: match.email,
                name: match.name,
                email: match.email,
                role: "viewer",
              };
            }
          } catch (e) {
            console.error("Viewer users parse error", e);
          }
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
        session.user.name = token.name;
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
