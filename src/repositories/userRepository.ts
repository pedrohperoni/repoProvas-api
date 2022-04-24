import { UserData } from "../services/userService.js";
import { prisma } from "../database.js";

export async function create(createUser: UserData) {
   await prisma.users.create({
       data: createUser
   })
}
