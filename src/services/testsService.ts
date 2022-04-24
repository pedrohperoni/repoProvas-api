import * as testsRepository from "../repositories/testsRepository.js"


export async function getByDisciplines(){
   const tests = await testsRepository.getAllByDisciplines()
   return tests
}

export async function getByTeachers(){
   const tests = await testsRepository.getAllByTeachers()
   return tests
}