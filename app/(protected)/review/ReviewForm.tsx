"use client";

import { createReview } from "./actions";

export function ReviewForm({ puzzleBoxId }) {
  async function action(formData: FormData) {
    await createReview({
      rating: Number(formData.get("rating")),
      comment: formData.get("comment")?.toString(),
      puzzleBoxId,
    });
  }

  return (
    <form action={action}>
      <button type="submit">Submit review</button>
    </form>
  );
}
