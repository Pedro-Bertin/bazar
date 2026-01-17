import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockProducts = [
  {
    id: 1,
    name: "Camisa usada",
    price: "R$ 30",
    description: "Uma camisa de algodão em bom estado.",
  },
  {
    id: 2,
    name: "Tênis seminovo",
    price: "R$ 120",
    description: "Tênis de corrida, pouco uso.",
  },
  {
    id: 3,
    name: "Livro de programação",
    price: "R$ 50",
    description: "Um livro sobre programação em JavaScript.",
  },
];

export function LatestProducts() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          Últimos itens adicionados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <Card key={product.id} className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>

              <CardContent className="font-semibold">
                {product.price}
              </CardContent>

              <CardContent className="text-sm text-muted-foreground">
                {product.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
