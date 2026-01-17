import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Um bazar simples, feito por pessoas reais
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Cadastre seus produtos, encontre itens únicos e participe de uma
          comunidade sem complicação.
        </p>
        <Link href="/register">
          <Button size="lg">Começar agora</Button>
        </Link>
      </div>
    </section>
  );
}
