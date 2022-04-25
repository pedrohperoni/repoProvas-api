import { Router } from "express";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import testsRouter from "./testsRouter.js";
var router = Router();
router.use(userRouter);
router.use(authRouter);
router.use(testsRouter);
export default router;
