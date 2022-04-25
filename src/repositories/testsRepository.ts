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
                           name: true,
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
