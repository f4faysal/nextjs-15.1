"use server";

import { auth } from "@/auth";
import db from "@/db";

// Get the role from the postgres database based on the UUID in the users table
export const getUserRole = async () => {
  const session = await auth();
  if (session) {
    const uuid = session.user?.id;

    // Sanitize input
    const uuidRegExp: RegExp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
      throw new Error("Invalid UUID");
    }

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
