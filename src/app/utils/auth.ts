import { prisma } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn:"/sign-in"
    } ,
    
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                  scope: "openid profile email https://www.googleapis.com/auth/gmail.readonly",
                },
            }
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
          if (url.startsWith(baseUrl)) {
            return url;
          } else if (url.startsWith('/')) {
            return `${baseUrl}${url}`;
          }
          return baseUrl;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.accessToken = token.accessToken;
                session.user.refreshToken = token.refreshToken;
            }
            return session;
        },
    }
}

export default authOptions