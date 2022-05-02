import { Router } from "express";
import * as categoriesController from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", categoriesController.getCategories);

export default categoriesRouter;
