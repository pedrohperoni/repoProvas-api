import { Request, Response } from "express";

export async function getTestsByDisciplines(req: Request, res:Response){
   console.log("TESTS CONTROLLER")
   console.log(res.locals.userId)
   res.sendStatus(201)
}