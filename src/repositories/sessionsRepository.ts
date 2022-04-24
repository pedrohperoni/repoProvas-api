import { prisma } from "../database.js";

export async function create(userId: number, token: string) {
  await prisma.sessions.create({
    data: { userId, token },
  });
}

export async function findSessionByToken(token: string) {
  return await prisma.sessions.findUnique({ 
     where: { token: token } 
   });
}
