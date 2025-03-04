import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { db } from '@/libs/prisma.db';
import { getAccountByUserId } from '@/services/account';
import { getTwoFactorConfirmationByUserId } from '@/services/two-factor-confirmation';
import { getUserById } from '@/services/user';

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  debug: false,
  basePath: '/api/auth',
  trustHost: true,
  ...authConfig,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    // async signIn(_message) {
    //   /* on successful sign in */
    // },
    // async signOut(_message) {
    //   /* on signout */
    // },
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') {
        return true;
      }

      const existingUser = await getUserById(user.id as string);

      // Prevent sign in without email verification
      if (!existingUser) {
        return false;
      }

      if (existingUser?.user?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser?.user?.id,
        );

        if (!twoFactorConfirmation) {
          return false;
        }

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },

    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.isOAuth = token.isOAuth;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        session.user.name = token.name;
        session.user.bio = token?.bio;
        session.user.email = token.email;
        session.user.routes = token.routes;
        session.user.menu = token.menu;
        session.user.token = token.token;
        session.user.hospital = token.hospital;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      const existingAccount = await getAccountByUserId(
        existingUser?.user?.id as string,
      );
      token.isOAuth = !!existingAccount;
      token.isTwoFactorEnabled = existingUser?.user?.isTwoFactorEnabled;
      token.name = existingUser?.user?.name;
      token.email = existingUser?.user?.email;
      token.role = existingUser?.user?.role;
      token.bio = existingUser?.user?.bio;
      token.routes = existingUser?.routes;
      token.menu = existingUser?.menu;
      token.token = existingUser?.token;
      token.hospital = existingUser?.config;

      return token;
    },
  },

});

export default auth;
