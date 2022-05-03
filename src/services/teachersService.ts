import * as teachersRepository from "../repositories/teachersRepository.js";

export async function getTeachersByDisciplineId(disciplineId: number) {
  const teachers = await teachersRepository.getTeachersByDisciplineId(
    disciplineId
  );
  if (teachers[0].teachersDisciplines.length === 0) throw { type: "not_found", message: "Teachers not found" };
  const filteredTeachers = filterTeachersDisciplines(teachers);
  return filteredTeachers;
}

function filterTeachersDisciplines(teachers){
  let filteredTeachers = [];
  for (let i = 0; i < teachers.length; i++) {
    if (teachers[i].teachersDisciplines.length > 0) {
      filteredTeachers.push({name: teachers[i].name, id: teachers[i].id});
    }
  }
  return filteredTeachers;
}
