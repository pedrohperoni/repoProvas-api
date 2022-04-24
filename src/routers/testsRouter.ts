import { Router } from "express";
import * as testsController from "../controllers/testsController.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";

const testsRouter = Router();

testsRouter.get("/tests/disciplines", tokenValidationMiddleware, testsController.getTestsByDisciplines);

export default testsRouter;
