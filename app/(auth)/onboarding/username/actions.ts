"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function setUsername(username: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 1️⃣ Check uniqueness in DB
  const existing = await prisma.user.findUnique({
    where: { username },
  });

  if (existing) {
    throw new Error("Username already taken");
  }

  // 2️⃣ Update Neon
  await prisma.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  // 3️⃣ Update Clerk (optional but recommended)
  await clerkClient.users.updateUser(userId, {
    username,
  });
}
