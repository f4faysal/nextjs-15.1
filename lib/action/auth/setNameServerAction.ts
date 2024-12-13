"use server";

import { auth } from "@/auth";
import db from "@/db";

export const setName = async (name: string) => {
  // Check if the user is authenticated
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const id = session.user?.id as string;
  await db.user.update({
    where: {
      id,
    },
    data: {
      name: name,
    },
  });
  return true;
};
