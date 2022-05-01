import * as testsRepository from "../repositories/testsRepository.js";

type teachers = Array<{
   id: number,
   name: string
}>

export async function getByDisciplines() {
  const tests = await testsRepository.getAllByDisciplines();
  return tests;
}

export async function getByTeachers() {
   const teachers = await testsRepository.getAllTeachers();
   const testsArray = sortTeachersArray(teachers);
   return testsArray;
}

export async function addViewByTestId(id: number){
   const test = await testsRepository.getTestById(id)
   if(!test) throw { type: "not_found", message: "Test not found" };

   await testsRepository.addViewByTestId(id)
}

async function sortTeachersArray(teachers: teachers) {
   let teachersArray = [];
   for (let i = 0; i < teachers.length; i++) {
      const categories = await testsRepository.getCategoryByTeacherId(
        teachers[i].id
      );
      const upperCaseName = UpperCaseFirstLetterAllWords(teachers[i].name);
      const updatedCategories = {
        id: teachers[i].id,
        teacher: upperCaseName,
        categories,
      };
      teachersArray = [...teachersArray, updatedCategories];
    }

    let sortedTeachersArray = []
    let test = {}
    let teacher = {}

    for(let i=0;i<teachersArray.length;i++){
       let teacherTests = []
      for(let j=0;j<teachersArray[i].categories.length;j++){
         for(let k=0;k<teachersArray[i].categories[j].tests.length;k++){
           test = {
               id: teachersArray[i].categories[j].tests[k].id,
               teacher: teachersArray[i].teacher,
               category: teachersArray[i].categories[j].name,
               test: teachersArray[i].categories[j].tests[k].name,
               views: teachersArray[i].categories[j].tests[k].views,
               pdfUrl: teachersArray[i].categories[j].tests[k].pdfUrl,
               discipline: teachersArray[i].categories[j].tests[k].teachersDisciplines.disciplines.name
            }
            teacherTests.push(test)
         }
      }
      teacher = {teacher: teachersArray[i].teacher, teacherTests}
      sortedTeachersArray.push(teacher)
    }

    return sortedTeachersArray
}

function UpperCaseFirstLetterAllWords(str: string) {
  const array = str.split(" ");
  for (var i = 0; i < array.length; i++) {
    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
  }
  const name = array.join(" ");
  return name;
}
