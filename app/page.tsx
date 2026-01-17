import { Header } from "@/app/_components/header";
import { Hero } from "@/app/_components/hero";
import { LatestProducts } from "./_components/latest-products";
import { Footer } from "@/app/_components/footer";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen flex flex-col">
      <Header user={user} />
      <Hero />
      <LatestProducts />
      <Footer />
    </main>
  );
}
