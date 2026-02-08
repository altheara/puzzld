"use client";

import { useState } from "react";
import { setUsername } from "./actions";

export function UsernameForm() {
  const [error, setError] = useState<string | null>(null);

  async function action(formData: FormData) {
    setError(null);

    try {
      const username = formData.get("username")?.toString()?.trim();
      if (!username) return;

      await setUsername(username);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    }
  }

  return (
    <form action={action}>
      <input
        name="username"
        placeholder="yourname"
        required
        minLength={3}
      />
      <button type="submit">Continue</button>
      {error && <p>{error}</p>}
    </form>
  );
}
