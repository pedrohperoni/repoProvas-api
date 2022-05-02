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

export async function getCategoryById(categoryId: number){
   const category = await prisma.categories.findUnique({
      where:{
         id: categoryId,
      }
   })
   return category;
}
