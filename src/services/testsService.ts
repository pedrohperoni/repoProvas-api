import * as testsRepository from "../repositories/testsRepository.js";
import * as teachersRepository from "../repositories/teachersRepository.js"
import * as disciplinesRepository from "../repositories/disciplinesRepository.js"
import * as categoriesRepository from "../repositories/categoriesRepository.js"

type teachers = Array<{
  id: number;
  name: string;
}>;

// --------------------------- GET TESTS ---------------------------

export async function getByDisciplines() {
  const tests = await testsRepository.getAllByDisciplines();
  return tests;
}

export async function getByTeachers() {
  const teachers = await testsRepository.getAllTeachers();
  const testsArray = sortTeachersArray(teachers);
  return testsArray;
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
 
   let sortedTeachersArray = [];
   let test = {};
   let teacher = {};

   // :)
 
   for (let i = 0; i < teachersArray.length; i++) {
     let teacherTests = [];
     for (let j = 0; j < teachersArray[i].categories.length; j++) {
       for (let k = 0; k < teachersArray[i].categories[j].tests.length; k++) {
         test = {
           id: teachersArray[i].categories[j].tests[k].id,
           teacher: teachersArray[i].teacher,
           category: teachersArray[i].categories[j].name,
           test: teachersArray[i].categories[j].tests[k].name,
           views: teachersArray[i].categories[j].tests[k].views,
           pdfUrl: teachersArray[i].categories[j].tests[k].pdfUrl,
           discipline:
             teachersArray[i].categories[j].tests[k].teachersDisciplines
               .disciplines.name,
         };
         teacherTests.push(test);
       }
     }
     teacher = { teacher: teachersArray[i].teacher, teacherTests };
     sortedTeachersArray.push(teacher);
   }
 
   return sortedTeachersArray;
 }
 
 function UpperCaseFirstLetterAllWords(str: string) {
   const array = str.split(" ");
   for (var i = 0; i < array.length; i++) {
     array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
   }
   const name = array.join(" ");
   return name;
 }
 

// --------------------------- UPDATE TEST VIEWS---------------------------

export async function addViewByTestId(id: number) {
  await findTestById(id);

  await testsRepository.addViewByTestId(id);
}


async function findTestById(testId: number){
   const test = await testsRepository.getTestById(testId);
   if (!test) throw { type: "not_found", message: "Test not found" };
}


// --------------------------- CREATE TEST ---------------------------

export async function createTest(test) {
  const { name, pdfUrl, categoryId, teacherId, disciplineId } = test;

  await findDisciplineById(parseInt(disciplineId))
  await findTeacherById(parseInt(teacherId))
  await findCategoryById(parseInt(categoryId))

  const findTeachersDisciplinesId = await testsRepository.findTeachersDisciplinesId(
      parseInt(teacherId),
      parseInt(disciplineId)
    );
  if (!findTeachersDisciplinesId)throw {type: "not_found", message: "Discipline is not assigned to selected teacher"};

  const testData = {
    name,
    pdfUrl,
    categoryId: parseInt(categoryId),
    teachersDisciplinesId: findTeachersDisciplinesId,
  };
  await testsRepository.createTest(testData);
}

async function findDisciplineById(disciplineId: number){
   const findDiscipline = await disciplinesRepository.getDisciplineById(disciplineId);
   if(!findDiscipline) throw { type: "not_found", message: "Discipline not found" };
}

async function findTeacherById(teacherId: number){
   const findTeacher = await teachersRepository.getTeacherById(teacherId);
   if(!findTeacher) throw { type: "not_found", message: "Teacher not found" };
}

async function findCategoryById(categoryId: number){
   const findCategory = await categoriesRepository.getCategoryById(categoryId);
   if(!findCategory) throw { type: "not_found", message:"Category not found"}
}


