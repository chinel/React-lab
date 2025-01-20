import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // the !exclamation mark tells typescript that the value will be present
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      // The credentials object is used specify the fields that we want it can be username or email
      credentials: {
        username: { label: "Username", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          return null;
        }

        // We will be using bycrypt to encrypt passwords, we have install bcyrpt first
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        return passwordMatch ? user : null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
