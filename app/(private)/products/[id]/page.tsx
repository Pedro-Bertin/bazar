import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import DeleteProductButton from "./delete-button";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return notFound();
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  if (product.userId !== user.id) {
    redirect("/products");
  }

  return (
    <main className="px-4 py-10 max-w-3xl mx-auto">
      {/* Voltar */}
      <Link href="/products" className="text-sm underline">
        ← Voltar para produtos
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Área da imagem (placeholder) */}
        {product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className="rounded-lg object-cover h-80 w-full"
          />
        ) : (
          <div className="bg-zinc-200 rounded-lg h-80 flex items-center justify-center text-muted-foreground">
            Sem imagem
          </div>
        )}

        {/* Informações */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{product.title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-xl font-bold">{product.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              Categoria: {product.category}
            </p>
            <p>{product.description}</p>
            <p className="text-sm text-muted-foreground">
              Vendedor: {product.user.name}
            </p>
            <div className="space-y-2">
              <Button className="w-full">Entrar em contato</Button>
              <Link href={`/products/${product.id}/edit`}>
                <Button variant="outline" className="w-full">
                  Editar produto
                </Button>
              </Link>
              <DeleteProductButton productId={product.id} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
