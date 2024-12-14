"use server";

import db from "@/db";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

interface CreateUserParams {
  email: string;
  name?: string;
  password?: string;
  role?: Role;
  createdBy: string; // ID of admin creating the user
}

export async function createUser({
  email,
  name,
  password,
  role = Role.user,
  createdBy,
}: CreateUserParams) {
  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password if provided
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  // Create user
  const newUser = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
      createdBy,
      isActive: true,
    },
  });

  return newUser;
}

export async function deactivateUser(userId: string, adminId: string) {
  // Verify admin status of the user performing deactivation
  const admin = await db.user.findUnique({
    where: {
      id: adminId,
      role: Role.admin,
    },
  });

  if (!admin) {
    throw new Error("Unauthorized: Only admins can deactivate users");
  }

  // Deactivate user
  return db.user.update({
    where: { id: userId },
    data: { isActive: false },
  });
}
