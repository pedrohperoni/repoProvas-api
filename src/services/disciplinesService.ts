import * as disciplinesRepository from "../repositories/disciplinesRepository.js";

export async function getDisciplines(){
   const disciplines = await disciplinesRepository.getDisciplines();
   if(!disciplines) throw { type: "not_found", message: "Disciplines not found"}
   return disciplines;
}
