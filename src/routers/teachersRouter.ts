import { Router } from "express";

import * as teachersController from "../controllers/teachersController.js";

const teachersRouter = Router();

teachersRouter.get("/teachers/:disciplineId", teachersController.getTeachersByDisciplineId);

export default teachersRouter;
