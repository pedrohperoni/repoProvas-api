import * as categoriesRepository from "../repositories/categoriesRepository.js"

export async function getCategories(){
   const categories = await categoriesRepository.getCategories();
   if(!categories) throw { type: "not_found", message: "Categories not found"}
   return categories;
}
