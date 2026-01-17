"use client";

import { deleteProduct } from "@/actions/product.actions";

type Props = {
  productId: number;
};

export default function DeleteButton({ productId }: Props) {
  async function handleDelete() {
    const confirmed = confirm("Tem certeza que deseja excluir este produto?");

    if (!confirmed) {
      return;
    }

    await deleteProduct(productId);
  }

  return (
    <button
      onClick={handleDelete}
      className="w-full rounded-md border border-red-600 text-red-600 py-2 mt-2 hover:bg-red-50"
    >
      Excluir produto
    </button>
  );
}
