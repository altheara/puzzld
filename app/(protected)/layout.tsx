import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/user";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.username) {
    redirect("/onboarding/username");
  }

  return <>{children}</>;
}
