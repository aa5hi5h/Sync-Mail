import NextAuth from "next-auth";

declare module "next-auth"{
    interface Session {
        user: {
            email: string,
            accessToken?: string,
            refreshToken?: string
        } & DefaultSession["user"];
    }
    interface user extends DefaultUser{
        accessToken?: string
        refreshToken?: string
    } 
}

declare module "next-auth/jwt"{
    interface JWT{
        accessToken?: string
        refreshToken?: string
    }
}