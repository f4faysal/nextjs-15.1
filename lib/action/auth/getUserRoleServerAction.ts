"use server";

import { auth } from "@/auth";
import db from "@/db";

// Get the role from the postgres database based on the UUID in the users table
export const getUserRole = async () => {
  const session = await auth();
  if (session) {
    const uuid = session.user?.id;

    const user = await db.user.findUnique({
      where: {
        id: uuid,
      },
      select: {
        role: true,
      },
    });
    return user?.role;
  }
};
