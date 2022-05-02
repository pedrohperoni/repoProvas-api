import { prisma } from "../database.js";
import { tests } from "@prisma/client"

type TestCreate = Omit<Omit<tests, "id">, "views">

export async function getAllByDisciplines() {
  const tests = await prisma.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          teachersDisciplines: {
            select: {
              teachers: {
                select: {
                  name: true,
                },
              },
              tests: {
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  views: true,
                  categories: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return tests;
}

export async function getAllTeachers() {
  const teachers = await prisma.teachers.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  return teachers;
}

export async function getCategoryByTeacherId(teacherId: number) {
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      tests: {
        where: {
          teachersDisciplines: {
            teacherId,
          },
        },
        select: {
          id: true,
          name: true,
          views: true,
          pdfUrl: true,
          teachersDisciplines: {
            select: {
              disciplines: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return categories;
}

export async function getTestById(id: number) {
  const test = await prisma.tests.findFirst({
    where: {
      id: id,
    },
  });
  return test;
}

export async function addViewByTestId(id: number) {
  await prisma.tests.update({
    where: {
      id: id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

export async function findTeachersDisciplinesId(teacherId: number,disciplineId: number) {
  const teachersDisciplines = await prisma.teachersDisciplines.findFirst({
    where:{
       teacherId: teacherId,
       disciplineId: disciplineId
    }
  });
  return teachersDisciplines.id;
}

export async function createTest(testData: TestCreate){
   await prisma.tests.create({
      data: testData
   })
}