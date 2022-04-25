import * as testsRepository from "../repositories/testsRepository.js"


export async function getByDisciplines(){
   const tests = await testsRepository.getAllByDisciplines()
   return tests
}

export async function getByTeachers(){
   const teachers = await testsRepository.getAllTeachers()
   
   let categoriesArray = []

   for(let i=0;i<teachers.length;i++){
      const categories = await testsRepository.getCategoryByTeacherId(teachers[i].id)
      const updatedCategories = {
         id: teachers[i].id,
         teacher: teachers[i].name,
         categories
      }
      categoriesArray = [...categoriesArray, updatedCategories]
   }
   return categoriesArray
}