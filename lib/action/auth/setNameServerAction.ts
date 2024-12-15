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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setPicture = async (image: string, email: any) => {
  // Check if the user is authenticated
  // const session = await auth();
  // if (!session) {
  //   throw new Error("Unauthorized");
  // }
  // const id = session.user?.id as string;
  await db.user.update({
    where: {
      email,
    },
    data: {
      image,
    },
  });
  return true;
};
