import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const { userId } = await auth();

{userId ? (
  <Link href="/reviews/new">Write a review</Link>
) : (
  <Link href="/sign-in">Sign in to review</Link>
)}
