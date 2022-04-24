import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { schemaValidationMiddleware } from "../middlewares/schemaValidationMiddleware.js";
import userLoginSchema from "../schemas/userLoginSchema.js";

const authRouter = Router();

authRouter.post("/login", schemaValidationMiddleware(userLoginSchema), authController.login);

export default authRouter;
