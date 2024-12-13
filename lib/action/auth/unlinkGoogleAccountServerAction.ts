"use server";

import { auth } from "@/auth";
import db from "@/db";

// Deletes the user's Google account record from the database
export const unlinkGoogleAccount = async () => {
  // Check if the user is authenticated
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const uuid = session.user?.id as string;

  // Remove the Google account from the database
  try {
    await db.account.deleteMany({
      where: {
        provider: "google",
        userId: uuid,
      },
    });

    return true;
  } catch (error) {
    console.error("Failed to unlink Google account:", error);
  }
};
