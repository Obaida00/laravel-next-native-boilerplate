import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { useRouter } from "next/router";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

// export async function loginIsRequiredServer() {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//         return redirect('/')
//     }
// }

// export function loginIsRequiredClient() {
//     if (typeof window !== "undefined") {
//         const session = useSession();
//         const router = useRouter();
//         if(!session) router.push('/')
//     }
// }

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
