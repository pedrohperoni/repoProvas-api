import { Request, Response } from "express";
import * as disciplinesService from "../services/disciplinesService.js";

export async function getDisciplines(req: Request, res: Response) {
  const disciplines = await disciplinesService.getDisciplines();
  res.send(disciplines);
}
