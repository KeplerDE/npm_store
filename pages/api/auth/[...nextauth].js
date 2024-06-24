// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { connectDb } from "../../../utils/db";

const signInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter your password.");
  }

  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Email or password is wrong!");
  }

  return user;
};

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await connectDb();
        const email = credentials.email;
        const password = credentials.password;

        const user = await User.findOne({ email });
        if (user) {
          return signInUser({ password, user });
        } else {
          throw new Error("This email does not exist.");
        }
      }
    })
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub);
      session.user.id = token.sub || user._id.toString();
      session.user.role = user.role || "user";
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
