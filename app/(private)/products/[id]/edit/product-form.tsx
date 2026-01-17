"use client";

import { updateProduct } from "@/actions/product.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";

type Props = {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
  };
};

export default function EditProductForm({ product }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  async function action(formData: FormData) {
    await updateProduct(product.id, formData);
  }

  return (
    <form ref={formRef} action={action} className="space-y-6">
      <div className="space-y-1">
        <Label>Nome</Label>
        <Input name="title" defaultValue={product.title} />
      </div>

      <div className="space-y-1">
        <Label>Descrição</Label>
        <Textarea name="description" defaultValue={product.description} />
      </div>

      <div className="space-y-1">
        <Label>Preço</Label>
        <Input name="price" defaultValue={product.price} />
      </div>

      <div className="space-y-1">
        <Label>Categoria</Label>
        <Input name="category" defaultValue={product.category} />
      </div>

      <Button type="submit" className="w-full">
        Salvar alterações
      </Button>
    </form>
  );
}
