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


 export async function getAllByTeachers(){
    const tests = await prisma.teachers.findMany({
      select:{
         name: true,
         teachersDisciplines:{
            select:{
               tests:{
                  select:{
                     name: true,
                     categories:{
                        select:{
                           name: true
                        }
                     }
                  }
               },
               disciplines:{
                  select:{
                     name: true
                  }
               }
            }
         }
      }
    })
    return tests
 }






//  export async function getAllByDisciplines() {
//    const tests = await prisma.terms.findMany({
//       select:{
//          number: true,
//          disciplines:{
//             select:{
//                name: true,
//                teachersDisciplines:{
//                   select:{
//                      tests:{
//                         select:{
//                            name: true,
//                            categories:{
//                               select:{
//                                  name: true
//                                      }
//                            },
//                            teachersDisciplines:{
//                               select:{
//                                  teachers:{
//                                     select:{
//                                        name: true
//                                     }
//                                  }
//                               }
//                            }
//                         }
//                      }
//                   }
//                }
//             }
//          }
//       }
//    })
//    return tests;
//  }