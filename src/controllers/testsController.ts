import { Request, Response } from "express";
import * as testsService from "../services/testsService.js"

export async function getTestsByDisciplines(req: Request, res:Response){
   const tests = await testsService.getByDisciplines()
   res.send(tests)
}

export async function getTestsByTeacher(req: Request, res:Response){
   const tests = await testsService.getByTeachers()
   res.send(tests)
}