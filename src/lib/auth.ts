import type { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.twitterId = account.providerAccountId;
      }
      if (profile) {
        token.twitterUsername = (profile as { data?: { username?: string } }).data
          ?.username;
        token.twitterImage = (
          profile as { data?: { profile_image_url?: string } }
        ).data?.profile_image_url;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.twitterId = token.twitterId as string | undefined;
      session.user.twitterUsername = token.twitterUsername as string | undefined;
      if (token.twitterImage) {
        session.user.image = token.twitterImage as string;
      }
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
