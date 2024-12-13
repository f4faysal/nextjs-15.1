"use server";

import { signIn } from "@/auth";

export const handleEmailSignIn = async (email: string) => {
  try {
    await signIn("nodemailer", { email, callbackUrl: "/dashboard" });
  } catch (error) {
    throw error;
  }
};
