import { prisma } from "../database.js";

export async function getCategories() {
  const categories = await prisma.categories.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  return categories;
}
