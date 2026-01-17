import { prisma } from "@/lib/prisma";

export async function getUserProducts(userId: number) {
  return prisma.product.findMany({
    where: { userId },
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
