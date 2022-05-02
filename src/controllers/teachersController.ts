import { Request, Response } from "express";
import * as teachersService from "../services/teachersService.js";

export async function getTeachersByDisciplineId(req: Request, res: Response) {
  const {disciplineId} = req.params
  const teachers = await teachersService.getTeachersByDisciplineId(parseInt(disciplineId))
  res.send(teachers);
}
