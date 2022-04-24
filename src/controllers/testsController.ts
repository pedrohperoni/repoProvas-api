import { Request, Response } from "express";
import * as testsService from "../services/testsService.js"

export async function getTestsByDisciplines(req: Request, res:Response){
   const tests = await testsService.getByDisciplines()
   res.send(tests).status(201)
}