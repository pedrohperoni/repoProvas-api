import { Request, Response } from "express";
import * as userService from "../services/userService.js"

export async function userCreate(req: Request, res:Response){
   const userData = req.body
   await userService.createUser(userData)
   res.sendStatus(201)
}