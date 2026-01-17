"use client";

import { createNewProduct } from "@/actions/product.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

type Errors = {
  image?: string;
  title?: string;
  description?: string;
  price?: string;
  category?: string;
};

export default function NewProductPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function validate(): boolean {
    const newErrors: Errors = {};

    if (!imageFile) {
      newErrors.image = "Imagem é obrigatória.";
    }

    if (title.trim().length < 3) {
      newErrors.title = "O nome deve ter pelo menos 3 caracteres";
    }

    if (description.trim().length < 10) {
      newErrors.description = "A descrição deve ter pelo menos 10 caracteres";
    }

    const numericPrice = Number(price.replace(",", "."));
    if (!price || isNaN(numericPrice) || numericPrice <= 0) {
      newErrors.price = "Informe um preço válido";
    }

    if (!category.trim()) {
      newErrors.category = "Informe a categoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) {
      return;
    }
    formRef.current?.requestSubmit();
  }

  return (
    <main className="px-4 py-10 max-w-3xl mx-auto">
      {/* Voltar */}
      <Link href="/products" className="text-sm underline">
        ← Voltar para produtos
      </Link>
      {/*Cabeçalho*/}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Cadastrar produto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form ref={formRef} action={createNewProduct} className="space-y-6">
            {/* Imagem */}
            <div className="space-y-2">
              <Label>Imagem do produto</Label>
              <Input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                className="mt-4 cursor-pointer"
              />
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image}</p>
              )}

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-48 w-full object-cover rounded-lg border mt-2"
                />
              )}
            </div>

            {/* Nome */}
            <div className="space-y-1">
              <Label htmlFor="title">Nome do produto</Label>
              <Input
                placeholder="Ex: Tênis Nike usado"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Descrição */}
            <div className="space-y-1">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                placeholder="Descreva o estado, uso, detalhes..."
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Preço */}
            <div className="space-y-1">
              <Label htmlFor="price">Preço</Label>
              <Input
                placeholder="R$ 0,00"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            {/* Categoria */}
            <div className="space-y-1">
              <Label htmlFor="category">Categoria</Label>
              <Input
                placeholder="Roupas, Eletrônicos..."
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>
          </form>

          <Button className="w-full" onClick={handleSubmit}>
            Cadastrar produto
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
