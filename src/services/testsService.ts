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
      const upperCaseName = UpperCaseFirstLetterAllWords(teachers[i].name)
      const updatedCategories = {
         id: teachers[i].id,
         teacher: upperCaseName,
         categories
      }
      categoriesArray = [...categoriesArray, updatedCategories]
   }
   return categoriesArray
}

function UpperCaseFirstLetterAllWords(str: string){
   const array = str.split(" ");
   for (var i = 0; i < array.length; i++) {
      array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
  
  }
  const name = array.join(" ");
  return name

}