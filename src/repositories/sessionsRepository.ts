import { prisma } from "../database.js";

export async function create(userId: number, token: string) {
  await prisma.sessions.create({ 
     data: {userId, token}
  });
}
