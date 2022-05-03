import { prisma } from "../src/database.js";

async function seed() {
  await prisma.$executeRaw`TRUNCATE TABLE
   sessions,
   users,
   categories,
   tests,
   "teachersDisciplines",
   teachers,
   disciplines,
   terms;
 `;

   await prisma.categories.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "P1",
    },
  });

  await prisma.teachers.upsert({
   where: { id: 1 },
   update: {},
   create: {
     name: "Teacher 1",
   },
 });

 await prisma.terms.upsert({
   where: { id: 1 },
   update: {},
   create: {
     number: 1,
   },
 });

 const termId = await prisma.terms.findFirst()

 await prisma.disciplines.upsert({
   where: { id: 1 },
   update: {},
   create: {
     name: "Discipline 1",
     termId: termId.id,
   },
 });

 const teacherId = await prisma.teachers.findFirst()
 const disciplineId = await prisma.disciplines.findFirst()

 await prisma.teachersDisciplines.upsert({
   where: { id: 1 },
   update: {},
   create: {
     teacherId: teacherId.id,
     disciplineId: disciplineId.id,
   },
 });
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
