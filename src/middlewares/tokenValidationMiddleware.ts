import { NextFunction, Request, Response } from "express";
import * as sessionsRepository from "../repositories/sessionsRepository.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export default async function tokenValidationMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) throw { type: "bad_request", message: "Token not defined" };

  const userDataBySession = await sessionsRepository.findSessionByToken(token);
  if (!userDataBySession) throw { type: "unauthorized", message: "Session not found" };

  const secretKey = process.env.JWT_SECRET;

  try {
    const user = jwt.verify(token, secretKey);
    if (!user) throw { type: "unauthorized", message: "Invalid Credentials" };
  } catch {
    throw { type: "unauthorized", message: "Invalid Credentials" };
  }
  
  res.locals.userId = userDataBySession.userId

  next();
}
