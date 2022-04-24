import { Request, Response } from "express";
import * as userService from "../services/userService.js"

export async function userRegister(req: Request, res:Response){
   const userData = req.body
   await userService.createUser(userData)
   res.send(201)
}