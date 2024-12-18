// import Nodemailer from "next-auth/providers/nodemailer";
// import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// import { clearStaleTokens } from "./lib/action/auth/clearStaleTokensServerAction";
// import { setName } from "./lib/action/auth/setNameServerAction";
import db from "./db";
import bcrypt from "bcrypt";
// import { Role } from "@prisma/client";
import { setPicture } from "./lib/action/auth/setNameServerAction";
import { clearStaleTokens } from "./lib/action/auth/clearStaleTokensServerAction";
import { Role } from "@prisma/client";

export default {
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/auth-success",
    error: "/auth/auth-error",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    // GitHub({
    //   clientId: process.env.AUTH_GITHUB_ID,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET,
    // }),
    // Nodemailer({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // Find the user by email
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        // Check if user exists and is active
        if (!user || !user.isActive) {
          return null;
        }

        // Verify password for email-based accounts
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password as string
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For Google sign-in, check if the user was created by an admin
      if (account?.provider === "google") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email! },
        });

        console.log("account google --> ", account);
        console.log("user google --> ", user);

        // Only allow sign-in for users created by admin
        return !!existingUser && existingUser.isActive;
      }

      return true;
    },
    // async session({ session, token }) {
    //   if (token.sub && session.user) {
    //     session.user.id = token.sub;
    //     session.user.role = token.role as Role;
    //   }
    //   return session;
    // },

    async jwt({ token, user, session, trigger, profile, account }) {
      console.log("jwt callback --->", {
        token,
        user,
        session,
        trigger,
        profile,
        account,
      });

      if (trigger === "signIn" && user?.image === null) {
        token.picture = profile?.picture;
        console.log("jwt callback trigger--->", {
          token,
          user,
          session,
          trigger,
          profile,
          account,
        });
        try {
          await setPicture(profile?.picture, user?.email);
          // await setName(user?.name ?? "");
        } catch (error) {
          console.error("Failed to set user Image:", error);
        }
      }

      if (user) {
        const { role } = user as { role: Role };
        await clearStaleTokens(); // Clear up any stale verification tokens from the database after a successful sign in
        token.role = role;
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    async session({ session, token }) {
      console.log("session callback --->", { session, token });
      session.user.role = token.role as Role;
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.role = user.role;
    //   }
    //   return token;
    // },
  },
  // callbacks: {
  //   async jwt({ token, user, session, trigger }) {
  //     if (trigger === "update" && session?.name !== token.name) {
  //       token.name = session.name;
  //       try {
  //         await setName(token?.name ?? "");
  //       } catch (error) {
  //         console.error("Failed to set user name:", error);
  //       }
  //     }

  //     if (user) {
  //       await clearStaleTokens(); // Clear up any stale verification tokens from the database after a successful sign in
  //       return {
  //         ...token,
  //         id: user.id,
  //       };
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     console.log("session callback", { session, token });
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id as string,
  //       },
  //     };
  //   },
  // },
} satisfies NextAuthConfig;
