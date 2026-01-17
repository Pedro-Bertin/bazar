import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <div className="min-h-screen bg-background">{children}</div>;
}
