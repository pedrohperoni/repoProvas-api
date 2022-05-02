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

export async function getDisciplineById(teacherId: number){
   const discipline = await prisma.disciplines.findUnique({
      where:{ 
         id:teacherId
      }
   })
   return discipline
}