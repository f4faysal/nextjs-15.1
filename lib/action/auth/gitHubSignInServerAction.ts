"use server";

import { signIn } from "@/auth";

export const handleGitHubSignIn = async () => {
  try {
    await signIn("github", { redirectTo: "/dashboard" });
  } catch (error) {
    throw error;
  }
};
