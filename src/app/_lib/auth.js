import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_KEY,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existUser = await getGuest(user.email);
        if (!existUser) {
          await createGuest({ fullName: user.name, email: user.email });
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestID = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
