import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database.js";
import { createUserBody, createUser } from "./factories/userFactory.js";
import {
  createTest,
  createValidRequestTestBody,
} from "./factories/testsFactory.js";
import { createSession } from "./factories/sessionFactory.js";

// --------------------------- AUTH ROUTES ---------------------------

describe("SIGN-UP -> POST(/users/create)", () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);

  it("should return status 201 when a valid body is given and persist the user", async () => {
    const body = await createUserBody();
    const response = await supertest(app).post("/users/create").send(body);
    const createdUser = await prisma.users.findUnique({
      where: {
        email: body.email,
      },
    });

    expect(response.status).toEqual(201);
    expect(createdUser).not.toBe(null);
  });

  it("should return status 409 when an email is already in use", async () => {
    const body = await createUser();
    const response = await supertest(app).post("/users/create").send(body);
    expect(response.status).toEqual(409);
  });

  it("should return status 422 when an invalid body is given", async () => {
    const body = {};
    const response = await supertest(app).post("/users/create").send(body);
    expect(response.status).toEqual(422);
  });
});

describe("SIGN-IN -> POST(/login)", () => {
  beforeEach(truncateUsers);
  afterAll(disconnect);
  it("should return status 200 and auth data when valid credentials are given, and persist user session", async () => {
    const body = await createUser();
    const response = await supertest(app).post("/login").send(body);
    const parseJSONResponse = JSON.parse(response.text);
    const session = await prisma.sessions.findUnique({
      where: {
        token: parseJSONResponse.token,
      },
    });
    expect(response.status).toEqual(200);
    expect(typeof response.text).toEqual("string");
    expect(session).not.toBe(null);
  });

  it("should return status 422 when an invalid body is given", async () => {
    const body = {};
    const response = await supertest(app).post("/login").send(body);
    expect(response.status).toEqual(422);
  });

  it("should return status 404 when an unregistered email is given", async () => {
    const body = { email: "email@email.com", password: "1234" };
    const response = await supertest(app).post("/login").send(body);
    expect(response.status).toEqual(404);
  });

  it("should return status 404 when the wrong password is given", async () => {
    const body = await createUser();
    body.password = "1234";
    const response = await supertest(app).post("/login").send(body);
    expect(response.status).toEqual(401);
  });
});

// --------------------------- INCREMENT TEST VIEWS ---------------------------

describe("CREATE VIEW -> PUT(/tests/views/:testId)", () => {
  afterAll(disconnect);
  beforeAll(truncateTests);
  it("should return status 201 after a successful increment of test(testId) views by one", async () => {
    await createTest();
    const originalTestState = await prisma.tests.findFirst();
    const response = await supertest(app).put(
      `/tests/views/${originalTestState.id}`
    );
    const finalTestState = await prisma.tests.findUnique({
      where: {
        id: originalTestState.id,
      },
    });

    expect(response.status).toBe(201);
    expect(finalTestState.views).toBe(originalTestState.views + 1);
  });

  it("should return status 404 when the testId does not reference any existing test", async () => {
    const testId = -1;
    const response = await supertest(app).put(`/tests/views/${testId}`);
    expect(response.status).toBe(404);
  });
});

// --------------------------- CREATE TEST ---------------------------

describe("GET CATEGORIES -> GET(/categories)", () => {
  afterAll(disconnect);
  it("should return status 200 and a not-null response", async () => {
    const response = await supertest(app).get("/categories");
    expect(response.status).toBe(200);
    expect(typeof response.text).not.toBe(null);
  });
});

describe("GET DISCIPLINES -> GET(/disciplines)", () => {
  afterAll(disconnect);
  it("should return status 200 and a not-null response", async () => {
    const response = await supertest(app).get("/disciplines");
    expect(response.status).toBe(200);
    expect(typeof response.text).not.toBe(null);
  });
});

describe("GET TEACHERS BY DISCIPLINE ID -> GET(/teachers/:disciplineId)", () => {
  afterAll(disconnect);
  it("should return status 200 and a not-null response", async () => {
    const disciplineId = await prisma.disciplines.findFirst();
    const response = await supertest(app).get(`/teachers/${disciplineId.id}`);
    expect(response.status).toBe(200);
    expect(typeof response.text).not.toBe(null);
  });

  it("should return status 404 when no teacherId is assigned to a disciplineId on table teachersDisciplines", async () => {
    const disciplineId = -1;
    const response = await supertest(app).get(`/teachers/${disciplineId}`);
    expect(response.status).toBe(404);
  });
});

describe("CREATE TEST -> POST(/tests/create)", () => {
  afterAll(disconnect);
  beforeAll(truncateTests);
  beforeAll(truncateUsers);

  it("should return status 401 when an invalid token is given)", async () => {
    const response = await supertest(app)
      .post("/tests/create")
      .set({ Authorization: null });
    expect(response.status).toBe(401);
  });

  it("should return status 422 when an invalid body is given (but a valid token)", async () => {
    const { token } = await createSession();
    const body = {};
    const response = await supertest(app)
      .post("/tests/create")
      .send(body)
      .set({ Authorization: token });
    expect(response.status).toBe(422);
  });

  it("should return status 201 when a valid token and body are given, and persist the test", async () => {
    const { token } = await createSession();
    const body = await createValidRequestTestBody();
    const response = await supertest(app)
      .post("/tests/create")
      .send(body)
      .set({ Authorization: token });
    const createdTest = await prisma.tests.findFirst({
      where: {
        name: body.name,
        pdfUrl: body.pdfUrl,
      },
    });
    expect(response.status).toBe(201);
    expect(createdTest).not.toBe(null);
  });

  it("should return status 404 when the body is valid but the disciplineId is not assigned to any discipline", async () => {
    const { token } = await createSession();
    const body = await createValidRequestTestBody();
    body.disciplineId = -1;
    const response = await supertest(app)
      .post("/tests/create")
      .send(body)
      .set({ Authorization: token });
    expect(response.status).toBe(404);
  });

  it("should return status 404 when the body is valid but the teacherId is not assigned to any teacher", async () => {
    const { token } = await createSession();
    const body = await createValidRequestTestBody();
    body.teacherId = -1;
    const response = await supertest(app)
      .post("/tests/create")
      .send(body)
      .set({ Authorization: token });
    expect(response.status).toBe(404);
  });

  it("should return status 404 when the body is valid but the categoryId is not assigned to any category", async () => {
    const { token } = await createSession();
    const body = await createValidRequestTestBody();
    body.categoryId = -1;
    const response = await supertest(app)
      .post("/tests/create")
      .send(body)
      .set({ Authorization: token });
    expect(response.status).toBe(404);
  });

  it("should return status 404 when the body is valid but there is no relationship between disciplineId and teacherId", async () => {
    const { token } = await createSession();
    let body = await createValidRequestTestBody();
    const teacher = await prisma.teachers.create({
      data: {
        name: "New teacher without any disciplines",
      },
    });
    body.teacherId = teacher.id;
    const response = await supertest(app)
      .post("/tests/create")
      .send(body)
      .set({ Authorization: token });
    expect(response.status).toBe(404);
  });
});

async function disconnect() {
  await prisma.$disconnect();
}

async function truncateUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE
      users,
      sessions;
    `;
}

async function truncateTests() {
  await prisma.$executeRaw`TRUNCATE TABLE 
      tests,
      "teachersDisciplines";`;
}

async function truncateDB(){
   await prisma.$executeRaw`TRUNCATE TABLE
   sessions,
   users,
   categories,
   tests,
   "teachersDisciplines",
   teachers,
   disciplines,
   terms;
 `;
}
