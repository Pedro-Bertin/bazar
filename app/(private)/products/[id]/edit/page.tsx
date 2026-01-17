import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditProductForm from "./product-form";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const productId = Number(id);
  if (isNaN(productId)) notFound();

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) notFound();
  if (product.userId !== user.id) redirect("/products");

  return (
    <main className="px-4 py-10 max-w-3xl mx-auto">
      <Link href={`/products/${productId}`} className="text-sm underline">
        ← Voltar para o produto
      </Link>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Editar produto</CardTitle>
        </CardHeader>

        <CardContent>
          <EditProductForm product={product} />
        </CardContent>
      </Card>
    </main>
  );
}
