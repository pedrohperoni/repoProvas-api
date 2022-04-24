import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { schemaValidationMiddleware } from "../middlewares/schemaValidationMiddleware.js"
import userRegisterSchema from "../schemas/userRegisterSchema.js";

const userRouter = Router();

userRouter.post("/users/create",schemaValidationMiddleware(userRegisterSchema), userController.userCreate);

export default userRouter;
