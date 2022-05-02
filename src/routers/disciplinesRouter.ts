import { Router } from "express";
import * as disciplinesController from "../controllers/disciplinesController.js";

const disciplinesRouter = Router();

disciplinesRouter.get("/disciplines", disciplinesController.getDisciplines);

export default disciplinesRouter;
