import { prisma } from "../database.js";

export async function getDisciplines(){
   const disciplines = await prisma.disciplines.findMany({
      select:{
         id: true,
         name: true
      }
   })
   return disciplines
}