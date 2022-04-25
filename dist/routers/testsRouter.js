import { Router } from "express";
import * as testsController from "../controllers/testsController.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";
var testsRouter = Router();
testsRouter.get("/tests/disciplines", tokenValidationMiddleware, testsController.getTestsByDisciplines);
testsRouter.get("/tests/teachers", tokenValidationMiddleware, testsController.getTestsByTeacher);
export default testsRouter;
