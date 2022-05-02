import { Router } from "express";
import * as testsController from "../controllers/testsController.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";
import { schemaValidationMiddleware } from "../middlewares/schemaValidationMiddleware.js";
import testSchema from "../schemas/testSchema.js"


const testsRouter = Router();

testsRouter.get("/tests/disciplines", tokenValidationMiddleware, testsController.getTestsByDisciplines);
testsRouter.get("/tests/teachers", tokenValidationMiddleware, testsController.getTestsByTeacher);
testsRouter.put("/tests/views/:testId", testsController.addViewByTestId);

testsRouter.post("/tests/create", tokenValidationMiddleware, schemaValidationMiddleware(testSchema), testsController.createTest)

export default testsRouter;
