import { Request, Response } from "express";
import * as categoriesService from "../services/categoriesService.js"

export async function getCategories(req: Request, res:Response){
   const categories = await categoriesService.getCategories()
   res.send(categories)
}