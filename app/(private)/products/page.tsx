import { Header } from "@/app/_components/header";
import { getCurrentUser } from "@/lib/auth";
import { getUserProducts } from "@/lib/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProductsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const products = await getUserProducts(user.id);

  return (
    <>
      <Header user={user} />

      <main className="min-h-screen bg-background px-4 py-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Cabeçalho da página */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Meus produtos</h1>
              <p className="text-muted-foreground">
                Produtos cadastrados por você
              </p>
            </div>
          </header>

          {/* Lista */}
          {products.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                Nenhum produto cadastrado ainda.
              </CardContent>
            </Card>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  {/* IMAGEM DO PRODUTO */}
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 w-full bg-muted flex items-center justify-center text-muted-foreground">
                      Sem imagem
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <p className="text-muted-foreground">
                      Categoria: {product.category}
                    </p>

                    <p className="font-bold">R$ {product.price.toFixed(2)}</p>

                    <Link href={`/products/${product.id}`}>
                      <Button variant="outline" className="w-full">
                        Ver detalhes
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </section>
          )}
        </div>
      </main>
    </>
  );
}
