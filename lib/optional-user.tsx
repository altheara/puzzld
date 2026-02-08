// lib/optional-user.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";

export async function getOptionalUser() {
  const { userId } = await auth();
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
}
