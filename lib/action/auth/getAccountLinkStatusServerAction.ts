"use server";

import { auth } from "@/auth";
import db from "@/db";

export const getAccountLinkStatus = async () => {
  // Check if the user is authenticated
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const uuid = session.user?.id as string;

  // Check if the user has a Google account linked
  try {
    const exists = await db.account.findFirst({
      where: {
        provider: "google",
        userId: uuid,
      },
    });
    if (!exists) {
      return false;
    }
  } catch (error) {
    console.error("Failed to check if user has Google account linked:", error);
  }

  return true;
};
