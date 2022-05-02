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

export async function addViewByTestId(req: Request, res:Response){
   const {testId} = req.params
   await testsService.addViewByTestId(parseInt(testId))
   res.sendStatus(201)
}

export async function createTest(req: Request, res:Response){
   const test = req.body
   await testsService.createTest(test)
   res.sendStatus(201)
}
