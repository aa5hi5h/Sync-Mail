import { prisma } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import authOptions from "../../../utils/auth"

const handler = NextAuth(authOptions)

export {handler as GET,handler as POST}