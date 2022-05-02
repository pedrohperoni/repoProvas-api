import { Router } from "express";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import testsRouter from "./testsRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import disciplinesRouter from "./disciplinesRouter.js";
import teachersRouter from "./teachersRouter.js";

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(testsRouter);
router.use(categoriesRouter);
router.use(disciplinesRouter);
router.use(teachersRouter);

export default router;
