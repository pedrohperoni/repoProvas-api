import { prisma } from "../database.js";

 export async function getAllByDisciplines() {
   const tests = await prisma.terms.findMany({
      select:{
         number: true,
         disciplines:{
            select:{
               name: true,
               teachersDisciplines:{
                  select:{
                     teachers:{
                        select:{
                           name: true,
                        }
                     },
                     tests:{
                        select:{
                           id: true,
                           name: true,
                           pdfUrl: true,
                           views: true,
                           categories:{
                              select:{
                                 name: true
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   })
   return tests;
 }

 export async function getAllTeachers(){
    const teachers = await prisma.teachers.findMany({
       select:{
          name: true,
          id: true
       }
    })
    return teachers
}

export async function getCategoryByTeacherId(teacherId: number){
   const categories = await prisma.categories.findMany({
      select:{
         id: true,
         name: true,
         tests:{
            where:{
               teachersDisciplines:{
                  teacherId
               }
            },
            select:{
               id: true,
               name: true,
               views: true,
               pdfUrl: true,
               teachersDisciplines:{
                  select:{
                     disciplines:{
                        select:{
                           name:true
                        }
                     }
                  }
               }
            }
         }
      }
   })
   return categories
}

export async function getTestById(id: number){
   const test = await prisma.tests.findFirst({
      where: { 
         id: id
      }
   })
   return test
}

export async function addViewByTestId(id: number){
   await prisma.tests.update({
      where: {
         id:id
      },
      data:{
         views:{
            increment: 1
         }
      }
   })
}
