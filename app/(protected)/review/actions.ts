"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";

export async function createReview(input: {
  rating: number;
  comment?: string;
  puzzleBoxId: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  return prisma.review.create({
    data: {
      rating: input.rating,
      comment: input.comment,
      puzzleBoxId: input.puzzleBoxId,
      userId: user.id,
    },
  });
}
