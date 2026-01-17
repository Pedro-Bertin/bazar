import { Header } from "@/app/_components/header";
import { getCurrentUser } from "@/lib/auth";
import { getUserProducts } from "@/lib/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const products = await getUserProducts(user.id);

  return (
    <>
      <Header user={user} />

      <main className="min-h-screen bg-background px-4 py-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Cards de resumo */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total de produtos</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {products.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Produtos ativos</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {products.length}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conta</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Bem-vindo, {user.name}!
              </CardContent>
            </Card>
          </section>

          {/* Área principal */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Seus produtos</CardTitle>
              </CardHeader>

              <CardContent>
                {products.length === 0 ? (
                  <p className="text-muted-foreground">
                    Você ainda não cadastrou nenhum produto.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {products.map((product) => (
                      <li
                        key={product.id}
                        className="flex justify-between border-b py-2 text-sm"
                      >
                        <span>{product.title}</span>
                        <span className="font-medium">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
