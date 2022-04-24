import * as testsRepository from "../repositories/testsRepository.js"


export async function getByDisciplines(){
   const tests = await testsRepository.getAllDisciplines()
   return tests
}