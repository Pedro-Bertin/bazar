"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";

type CreateProductInput = {
  title: string;
  description: string;
  price: number;
  category: string;
  userId: number;
  imageUrls: string[];
};

export async function createProduct(data: CreateProductInput) {
  const product = await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      userId: data.userId,
      images: {
        create: data.imageUrls.map((url) => ({
          url,
        })),
      },
    },
  });

  return product;
}

export async function createNewProduct(formData: FormData) {
  const userId = await getSession();

  if (!userId) {
    redirect("/login");
  }

  const image = formData.get("image");

  if (!image || !(image instanceof File) || image.size === 0) {
    throw new Error("Imagem inválida!");
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "bazar-products" }, (error, result) => {
          if (error || !result) {
            return reject(error);
          } else {
            resolve(result as any);
          }
        })
        .end(buffer);
    }
  );

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const priceRaw = formData.get("price") as string;
  const price = Number(priceRaw.replace(",", "."));

  if (!title || !description || !category || isNaN(price) || price <= 0) {
    throw new Error("Dados inválidos!");
  }

  const product = await prisma.product.create({
    data: {
      title,
      description,
      category,
      price,
      userId,
    },
  });

  await prisma.productImage.create({
    data: {
      url: uploadResult.secure_url,
      productId: product.id,
    },
  });

  redirect("/products");
}

export async function updateProduct(productId: number, formData: FormData) {
  const userId = await getSession();

  if (!userId) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const priceRaw = formData.get("price") as string;

  if (!title || !description || !category || !priceRaw) {
    throw new Error("Dados inválidos!");
  }

  const price = Number(priceRaw.replace(",", "."));

  if (isNaN(price) || price <= 0) {
    throw new Error("Preço inválido!");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      userId: true,
    },
  });

  if (!product || product.userId !== userId) {
    redirect("/products");
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      title,
      description,
      category,
      price,
    },
  });

  redirect(`/products/${productId}`);
}

export async function deleteProduct(productId: number) {
  const userId = await getSession();

  if (!userId) {
    redirect("/login");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { userId: true },
  });

  if (!product || product.userId !== userId) {
    redirect("/products");
  }

  await prisma.productImage.deleteMany({
    where: {
      productId,
    },
  });

  await prisma.product.delete({
    where: { id: productId },
  });

  redirect("/products");
}
