import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import { tests } from "@prisma/client";

type Tests = Omit<tests, "id">;

export async function createTestBody() {
  const categoryId = await prisma.categories.findFirst();
  const teacherId = await prisma.teachers.findFirst();
  const disciplineId = await prisma.disciplines.findFirst();
  const teachersDisciplinesId = await prisma.teachersDisciplines.create({
    data: {
      teacherId: teacherId.id,
      disciplineId: disciplineId.id,
    },
  });

  const test: Tests = {
    name: faker.lorem.lines(),
    pdfUrl: faker.internet.url(),
    categoryId: categoryId.id,
    teachersDisciplinesId: teachersDisciplinesId.id,
    views: 0,
  };
  return test;
}

export async function createValidRequestTestBody() {
  const categoryId = await prisma.categories.findFirst();
  const teacherId = await prisma.teachers.findFirst();
  const disciplineId = await prisma.disciplines.findFirst();
  await prisma.teachersDisciplines.create({
    data: {
      teacherId: teacherId.id,
      disciplineId: disciplineId.id,
    },
  });
  const test = {
    name: faker.lorem.lines(),
    pdfUrl: faker.internet.url(),
    categoryId: categoryId.id,
    teacherId: teacherId.id,
    disciplineId: disciplineId.id,
  };

  return test;
}

export async function createTest() {
  const body = await createTestBody();
  const test = await prisma.tests.create({
    data: {
      name: body.name,
      pdfUrl: body.pdfUrl,
      categoryId: body.categoryId,
      teachersDisciplinesId: body.teachersDisciplinesId,
      views: 0,
    },
  });
  return test;
}
