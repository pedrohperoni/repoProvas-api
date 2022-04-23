import { Router } from "express";
import * as controller from "../controllers/userController.js";
import { schemaValidationMiddleware } from "../middlewares/schemaValidationMiddleware.js"
import userRegisterSchema from "../schemas/userRegisterSchema.js";

const userRouter = Router();

userRouter.post("/users/register",schemaValidationMiddleware(userRegisterSchema), controller.userRegister);

export default userRouter;
