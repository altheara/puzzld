// src/lib/user.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  if (!user) return null;

  return prisma.user.upsert({
    where: { clerkUserId: userId },
    update: {
      avatarUrl: user.imageUrl,
      // ⚠️ do NOT overwrite username here
    },
    create: {
      clerkUserId: userId,
      avatarUrl: user.imageUrl,
      username: user.username ?? null,
    },
  });
}
