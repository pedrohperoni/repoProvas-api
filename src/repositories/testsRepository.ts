import { prisma } from "../database.js";

export async function getAllDisciplines() {
   const tests = await prisma.terms.findMany({
      select:{
         number: true,
         disciplines:{
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
                           },
                           teachersDisciplines:{
                              select:{
                                 teachers:{
                                    select:{
                                       name: true
                                    }
                                 }
                              }
                           }
                        }
                     },
                  }
               }
            }
         },
      },
   })
   return tests;
 }

// ??? -> relacionar as tabelas sem pegar as vazias

// export async function getAllDisciplines() {
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
//                            categories:{
//                               select:{
//                                  name: true,
//                                  tests:{
//                                     select:{
//                                        name: true,
//                                        teachersDisciplines:{
//                                           select:{
//                                              teachers:{
//                                                 select:{
//                                                    name: true
//                                                 }
//                                              }
//                                           }
//                                        }
//                                     }
//                                  }
//                               }
                              
//                            }                           
//                         }
//                      },
//                   }
//                }
//             }
//          },
//       },
//    })
//    return tests;
//  }
