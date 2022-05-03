import { prisma } from "../../src/database.js";
import { sessions } from "@prisma/client";
import { createUser } from "./userFactory.js";
import jwt from "jsonwebtoken";

type Session = Omit<sessions, "id">;

export async function createSession() {
  const user = await createUser();
  const createdUser = await prisma.users.findUnique({
    where: {
      email: user.email,
    },
  });
  const secretKey = process.env.JWT_SECRET;
  const config = { expiresIn: 60 * 60 * 24 * 30 };
  const token = jwt.sign(user, secretKey, config);
  const session: Session = {
    userId: createdUser.id,
    token: token,
  };
  await prisma.sessions.create({
    data: {
      userId: createdUser.id,
      token,
    },
  });
  return session;
}
