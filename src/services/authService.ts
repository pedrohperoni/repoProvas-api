import { prisma } from '../database.js';
import { users } from '@prisma/client';
import * as sessionsRepository from "../repositories/sessionsRepository.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type UserLoginData= Omit<users, 'id'>;


export async function login(UserLoginRequest: UserLoginData ){
   const {email, password} = UserLoginRequest

   const user = await findUserByEmail(email)
   await checkPassword(password, user.password)

   const secretKey = process.env.JWT_SECRET;
   const config = { expiresIn: 60*60*24*30 }
   const token = jwt.sign(user, secretKey, config);

   await sessionsRepository.create(user.id, token)

   const loginData = {
      token, 
      userId: user.id,
      email: user.email
   }
   
   return loginData
}

async function findUserByEmail(email: string) {
   const user = await prisma.users.findFirst({
     where: { email: email },
   });
   if (!user){
      throw { type: "not_found", message: "Email not found" };
   }

   return user
 }

 async function checkPassword(requestPassword: string, userPassword: string ){
    if(!bcrypt.compareSync(requestPassword, userPassword)) throw {
       type: 'unauthorized', message: 'Passwords do not match'
    }
 }

