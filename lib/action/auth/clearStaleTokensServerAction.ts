"use server";

import db from "@/db";

export const clearStaleTokens = async () => {
  try {
    await db.verificationToken.deleteMany({
      where: {
        expires: {
          lt: new Date(),
        },
      },
    });
  } catch (error) {
    throw error;
  }
};
