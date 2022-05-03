import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import bcrypt from "bcrypt";
import { users } from "@prisma/client";

type User = Omit<users, "id">;

export async function createUserBody() {
  const user: User = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  return user;
}

export async function createUser() {
  const user: User = await createUserBody();
  await prisma.users.create({
    data: {
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
    },
  });
  return user;
}
