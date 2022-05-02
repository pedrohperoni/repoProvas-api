import { prisma } from "../database.js";

export async function getTeachersByDisciplineId(disciplineId: number) {
  const teachers = await prisma.teachers.findMany({
    select: {
      name: true,
      id: true,
      teachersDisciplines:{
         where:{
            disciplineId: disciplineId
         }
      }
    },
  });
  return teachers;
}